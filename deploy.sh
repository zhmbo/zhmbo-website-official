# 现已通过GitHub Actions自动部署，提交只需 'git push' 即可
# 若不想使用自动部署，可以直接运行命令 'npm run deploy' 本地自动提交部署

# 确保脚本抛出遇到的错误
set -e

# 执行gulp
gulp release 

# 进入生成的文件夹
cd release

if [ -z "$CODING_TOKEN" ]; then  # -z 字符串 长度为0则为true；$CODING_TOKEN来自于github仓库`Settings/Secrets`设置的私密环境变量
  msg='deploy'
  codingUrl=git@e.coding.net:itzhangbao/blog/home.git
else
  msg='来自github actions的自动部署'
  git config --global user.name "itzhangbao"
  git config --global user.email "itzhangbao@163.com"
  codingUrl=https://ZYzEthRPkx:${CODING_TOKEN}@e.coding.net/itzhangbao/blog/home.git
fi
git init
git add -A
git commit -m "${msg}"
git push -f $codingUrl master # 推送到coding

cd - # 退回开始所在目录
rm -rf release

