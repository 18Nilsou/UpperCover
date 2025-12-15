import unicodedata

def normalize_line(line):
    line = ''.join(
        c for c in unicodedata.normalize('NFD', line)
        if unicodedata.category(c) != 'Mn'
    )
    line = line.replace(' ', '-')
    return line

def remove_duplicate_lines(input_file, output_file):
    try:
        with open(input_file, 'r') as file:
            lines = file.readlines()

        unique_lines = set()
        result_lines = []

        for line in lines:
            normalized_line = normalize_line(line.strip()) + '\n'
            if normalized_line not in unique_lines:
                unique_lines.add(normalized_line)
                result_lines.append(normalized_line)

        with open(output_file, 'w') as file:
            file.writelines(result_lines)

        print(f"Les doublons ont été supprimés. Résultat enregistré dans '{output_file}'.")
    except FileNotFoundError:
        print(f"Le fichier '{input_file}' n'existe pas.")
    except Exception as e:
        print(f"Une erreur s'est produite : {e}")

input_file = "../public/words.txt"  
output_file = "../public/words.txt"  
remove_duplicate_lines(input_file, output_file)