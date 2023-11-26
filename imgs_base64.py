import base64
import json
import os

# Assuming all your images are in the 'path_to_images' directory
path_to_images = '/users/gabs/desktop/camoin-jodorowsky'
encoded_images = []

# Loop over each image file
for filename in os.listdir(path_to_images):
    if filename.endswith('.png'):  # or '.jpg' or whatever file type your images are
        # Read the image
        with open(os.path.join(path_to_images, filename), 'rb') as image_file:
            # Encode it in base64
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
            # Append to the list as a dict
            encoded_images.append({
                "key": filename.split('.')[0],  # Assuming the filename is the card number
                "value": encoded_string
            })

# Write the list to a JSON file
with open('tarot_cards.json', 'w') as json_file:
    json.dump(encoded_images, json_file)
