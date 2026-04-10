with open('components/sections/projects.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

import re
text = re.sub(
    r'<div className="p-6 -mt-12 relative z-20 pointer-events-none">',
    '<div className="p-6 -mt-12 relative z-20 pointer-events-none flex-grow flex flex-col">',
    text
)

text = re.sub(
    r'<div className="p-6 flex flex-col flex-grow z-20 pointer-events-auto">',
    '<div className="p-6 flex flex-col flex-grow z-20 pointer-events-auto">',
    text
)

with open('components/sections/projects.tsx', 'w', encoding='utf-8') as f:
    f.write(text)
print('Updated with re')
