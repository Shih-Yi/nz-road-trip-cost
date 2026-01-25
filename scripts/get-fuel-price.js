#!/usr/bin/env node

/**
 * MBIE Fuel Price Scraper for VanMath
 *
 * Fetches weekly fuel prices from the NZ Ministry of Business, Innovation & Employment.
 * Data source: https://www.mbie.govt.nz/building-and-energy/energy-and-natural-resources/energy-statistics-and-modelling/energy-statistics/weekly-fuel-price-monitoring
 *
 * Writes to: data/fuel-prices.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CSV_URL = 'https://www.mbie.govt.nz/assets/Data-Files/Energy/Weekly-fuel-price-monitoring/weekly-table.csv';
const OUTPUT_FILE = path.join(__dirname, '..', 'data', 'fuel-prices.json');

/**
 * Parse CSV text into array of objects
 */
const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

  return lines.slice(1).map(line => {
    // Handle CSV values that may contain commas within quotes
    const values = [];
    let current = '';
    let inQuotes = false;

    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = values[i] || '';
    });
    return obj;
  });
};

/**
 * Get the most recent price for a fuel type
 */
const getLatestPrice = (data, fuelType) => {
  // Filter for the specific fuel and "Adjusted retail price" variable
  const fuelData = data.filter(row =>
    row.Fuel === fuelType &&
    row.Variable === 'Adjusted retail price' &&
    row.Value &&
    !isNaN(parseFloat(row.Value))
  );

  if (fuelData.length === 0) {
    console.error(`No data found for ${fuelType}`);
    return null;
  }

  // Sort by date descending to get the most recent
  fuelData.sort((a, b) => {
    const dateA = new Date(a.Date);
    const dateB = new Date(b.Date);
    return dateB - dateA;
  });

  const latest = fuelData[0];
  // Value is in cents/L, convert to dollars/L
  const priceInDollars = parseFloat(latest.Value) / 100;

  return {
    date: latest.Date,
    price: Math.round(priceInDollars * 100) / 100 // Round to 2 decimal places
  };
};

/**
 * Read existing fuel prices from JSON file
 */
const readExistingData = () => {
  try {
    if (fs.existsSync(OUTPUT_FILE)) {
      const content = fs.readFileSync(OUTPUT_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn('Could not read existing data, starting fresh:', error.message);
  }
  return [];
};

/**
 * Write fuel prices to JSON file
 */
const writeData = (data) => {
  // Ensure directory exists
  const dir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2) + '\n');
  console.log(`Data written to ${OUTPUT_FILE}`);
};

/**
 * Main scraper function
 */
const main = async () => {
  console.log('Fetching MBIE fuel price data...');

  try {
    // Fetch CSV data
    const response = await fetch(CSV_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const csvText = await response.text();
    console.log(`Fetched ${csvText.length} bytes of CSV data`);

    // Parse CSV
    const data = parseCSV(csvText);
    console.log(`Parsed ${data.length} rows`);

    // Get latest prices
    const petrolData = getLatestPrice(data, 'Regular Petrol');
    const dieselData = getLatestPrice(data, 'Diesel');

    if (!petrolData || !dieselData) {
      throw new Error('Could not extract fuel prices from data');
    }

    console.log(`Latest Petrol: $${petrolData.price}/L (${petrolData.date})`);
    console.log(`Latest Diesel: $${dieselData.price}/L (${dieselData.date})`);

    // Use the most recent date between petrol and diesel
    const latestDate = new Date(petrolData.date) > new Date(dieselData.date)
      ? petrolData.date
      : dieselData.date;

    // Format date as YYYY-MM-DD
    const dateObj = new Date(latestDate);
    const formattedDate = dateObj.toISOString().split('T')[0];

    // Read existing data
    const existingData = readExistingData();

    // Check if entry for this date already exists
    const existingIndex = existingData.findIndex(entry => entry.date === formattedDate);

    const newEntry = {
      date: formattedDate,
      petrol: petrolData.price,
      diesel: dieselData.price
    };

    if (existingIndex >= 0) {
      // Update existing entry
      console.log(`Updating existing entry for ${formattedDate}`);
      existingData[existingIndex] = newEntry;
    } else {
      // Append new entry
      console.log(`Adding new entry for ${formattedDate}`);
      existingData.push(newEntry);
    }

    // Sort by date ascending
    existingData.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Write updated data
    writeData(existingData);

    console.log('Done!');

  } catch (error) {
    console.error('Error fetching fuel prices:', error);
    process.exit(1);
  }
};

main();
