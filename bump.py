# الاستخدام:  python bump.py 1.1.0 "ملاحظات الإصدار"   (أضف --manual لمنع التحديث الصامت)
import re,sys,json,pathlib
v=sys.argv[1];n=sys.argv[2] if len(sys.argv)>2 else '';p=pathlib.Path(__file__).parent
for f,pat,rep in [('index.html',r"const APP_VERSION='[^']*'","const APP_VERSION='%s'"%v),('sw.js',r"const VERSION='[^']*'","const VERSION='%s'"%v)]:
    t=(p/f).read_text(encoding='utf8');t=re.sub(pat,rep,t,1);(p/f).write_text(t,encoding='utf8')
json.dump({'version':v,'notes':n,'auto':'--manual' not in sys.argv},open(p/'version.json','w',encoding='utf8'),ensure_ascii=False,indent=1)
print('تم رفع الإصدار إلى',v)
