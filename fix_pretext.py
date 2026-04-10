with open('components/three/pretext-background.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Only keep the first block
split_str = '"use client";'
blocks = text.split(split_str)
if len(blocks) > 2:
    # meaning there is more than 1 block, it's safe to take the first plus split_str
    # blocks[0] might be empty if it started with "use client"
    new_text = split_str + blocks[1]
    with open('components/three/pretext-background.tsx', 'w', encoding='utf-8') as f:
        f.write(new_text)
    print('Fixed duplicate code')
else:
    print('Not split')
