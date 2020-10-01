# 现已通过GitHub Actions自动部署，提交只需 'git push' 即可
# 若不想使用自动部署，可以直接运行命令 'npm run deploy' 本地自动提交部署

# 确保脚本抛出遇到的错误
set -e

# 添加打包日期到home.js 1d:删除第一行 2i 在第二行插入
cd application/babel/templates/
if [ -z "$CODING_TOKEN" ]; then # Mac 的sed需要在 -i 后添加备份文件，忽略需要以空字符代替（MAC是BSA ubuntu是GNU）
sed -i "" "1d;2i\\
var upTime = '`date '+%Y-%m-%d %H:%M:%S'`'\\
" home.js
else
sed -i "1d;2i\\
var upTime = '`date '+%Y-%m-%d %H:%M:%S'`'\\
" home.js
fi

cd -

# 执行gulp
gulp release 

# 进入生成的文件夹
cd release

if [ -z "$CODING_TOKEN" ]; then  # -z 字符串 长度为0则为true；$CODING_TOKEN来自于github仓库`Settings/Secrets`设置的私密环境变量
  msg='deploy'
  codingUrl=git@e.coding.net:itzhangbao/website/official.git
else
  msg='来自github actions的自动部署'
  git config --global user.name "itzhangbao"
  git config --global user.email "itzhangbao@163.com"
  codingUrl=https://ZYzEthRPkx:${CODING_TOKEN}@e.coding.net/itzhangbao/website/official.git
fi

git clone -b site-blog $codingUrl blog
find . -name ".git" | xargs rm -Rf

git init
git add -A
git commit -m "${msg}"
git push -f $codingUrl master # 推送到coding

cd - # 退回开始所在目录
rm -rf release

