# install qrcode and image : pip3 install qrcode Image

import qrcode

def generate_qr_code(text):
    qr=qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    
    qr.add_data(text)
    qr.make(fit=True)
    img=qr.make_image(fill_color="black",back_color="white")
    img.save('qrcode.png')

url=input('Enter the URL: ')
generate_qr_code(url)    