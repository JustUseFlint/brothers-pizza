import sys
from PIL import Image
n=sys.argv[1]; th=int(sys.argv[2]) if len(sys.argv)>2 else 1800
im=Image.open(f'/workspace/brothers-pizza/shots/{n}.png'); w,h=im.size
k=0
for y in range(0,h,th):
  t=im.crop((0,y,w,min(h,y+th)))
  if w>1000 and 'phone' in n: t=t.resize((w//2,t.height//2))
  t.save(f'/tmp/t-{n}-{k}.png'); k+=1
print(k)
