import os
import re
import unicodedata

def slugify(value):
    # Normalize unicode characters to ditch accents
    value = unicodedata.normalize('NFD', value).encode('ascii', 'ignore').decode('ascii')
    # Replace anything non-alphanumeric/dot/slash with underscore
    value = re.sub(r'[^\w\s\.\/]', '_', value).strip()
    # Replace spaces with underscores
    value = re.sub(r'[\s]+', '_', value)
    return value

def rename_recursive(root_dir):
    for root, dirs, files in os.walk(root_dir, topdown=False):
        # Rename files first
        for name in files:
            new_name = slugify(name)
            if new_name != name:
                old_path = os.path.join(root, name)
                new_path = os.path.join(root, new_name)
                print(f"Renaming file: {old_path} -> {new_path}")
                os.rename(old_path, new_path)
        
        # Then rename directories
        for name in dirs:
            new_name = slugify(name)
            if new_name != name:
                old_path = os.path.join(root, name)
                new_path = os.path.join(root, new_name)
                print(f"Renaming dir: {old_path} -> {new_path}")
                os.rename(old_path, new_path)

if __name__ == "__main__":
    target = "/Users/vii/Work/trava_web/public/assets/trava"
    rename_recursive(target)
