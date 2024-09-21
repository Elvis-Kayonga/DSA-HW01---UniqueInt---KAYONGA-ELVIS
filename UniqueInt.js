const { promises: fileSystem } = require('fs'); // Import 'fs' module using promises

class Sorter {
    constructor(sourceFile, targetFile) {
        this.sourceFile = sourceFile;   // Path for the input file
        this.targetFile = targetFile;   // Path for the output file
    }

    // Method to initiate the sorting operation
    async processSort() {
        try {
            const rawData = await this.getInputFile();   // Fetch input file contents
            const distinctNumbers = this.getUniqueNumbers(rawData); // Extract unique finite numbers
            const orderedNumbers = this.organizeArray(distinctNumbers); // Sort the numbers
            await this.saveToOutputFile(orderedNumbers); // Save sorted data to the output file
            console.log('Sorting completed and file saved!');
        } catch (err) {
            console.error('Processing encountered an error:', err);
        }
    }

    // Retrieve data from the input file
    async getInputFile() {
        try {
            return await fileSystem.readFile(this.sourceFile, 'utf-8');
        } catch (err) {
            throw new Error(`Failed to read input file: ${err.message}`);
        }
    }

    // Extract unique finite numbers from the input
    getUniqueNumbers(rawData) {
        const dataLines = rawData.split(/\r?\n/);  // Split content by newlines
        const numSet = new Set();

        for (let line of dataLines) {
            const cleanLine = line.trim();  // Clean up leading/trailing spaces
            if (cleanLine) {
                const numValue = Number(cleanLine);
                if (Number.isFinite(numValue)) {
                    numSet.add(numValue);  // Collect unique finite numbers
                }
            }
        }
        return [...numSet];  // Convert set to array
    }

    // Sort the numbers in ascending order
    organizeArray(numArray) {
        return numArray.sort((x, y) => x - y);  // Use built-in sort
    }

    // Write sorted numbers to the output file
    async saveToOutputFile(orderedNumbers) {
        try {
            const fileOutput = orderedNumbers.join('\n');  // Join array into a string
            await fileSystem.writeFile(this.targetFile, fileOutput, 'utf-8');
        } catch (err) {
            throw new Error(`Failed to write to output file: ${err.message}`);
        }
    }
}

// Example usage:
const fileSorter = new Sorter('input.txt', 'output.txt');
fileSorter.processSort();  // Start sorting and writing to file
