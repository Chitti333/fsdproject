import csv
from collections import defaultdict

# Function to parse CSV and categorize words by length
def categorize_words_by_length(file_path):
    # Dictionary to store words categorized by their length
    word_categories = defaultdict(list)
    
    try:
        # Open and read the CSV file
        with open(file_path, mode='r', encoding='utf-8') as csv_file:
            csv_reader = csv.reader(csv_file)
            
            for row in csv_reader:
                for word in row:  # Assume words are separated by commas in each row
                    word = word.strip()  # Remove any extra spaces
                    if word:  # Skip empty words
                        word_categories[len(word)].append(word)
        
        return word_categories

    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
        return {}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {}
def add_quote_to_csv(file_path):
    try:
        # Read the original file
        with open(file_path, 'r') as file:
            lines = file.readlines()
        
        # Add a double quote at the end of each line
        modified_lines = [line.rstrip('\n') + '",' + '\n' for line in lines]
        
        # Write the modified content back to the file
        with open(file_path, 'w') as file:
            file.writelines(modified_lines)
        
        print(f"Successfully added quotes to the end of each line in {file_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Provide the path to your CSV file
file_path = 'level03_words.csv'  # Replace with the actual file path
add_quote_to_csv(file_path)

# # File path to the CSV file
# file_path = "words.csv"

# # Categorize words and print the results
# word_categories = categorize_words_by_length(file_path)

# # Print categorized words
# for length, words in sorted(word_categories.items()):
#     print(f"{length}-letter words: {', '.join(words[:10])}")
#     break # Display first 10 words for brevity
