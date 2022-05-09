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

# 一、生成静态文件
echo "一、生成静态文件"
gulp release 

# 二、配置coding地址
echo "二、配置coding地址"
if [ -z "$GITHUB_TOKEN" ]; then  # -z 字符串 长度为0则为true；$GITHUB_TOKEN 来自于github仓库`Settings/Secrets`设置的私密环境变量
  msg='deploy'
  githubUrl=git@github.com:itzhangbao/itzhangbao.com.git
else
  msg='来自github actions的自动部署'
  git config --global user.name "itzhangbao"
  git config --global user.email "itzhangbao@163.com"
  githubUrl=https://itzhangbao:${GITHUB_TOKEN}@github.com/itzhangbao/itzhangbao.com.git
fi

#三、备份到【site-official】
echo "三、备份到【site-official】"
cd release
git init
git add -A
git commit -m"${msg}"
git push -f ${githubUrl} master:site-official
find . -name ".git" | xargs rm -Rf

#四、克隆【site-blog】
echo "四、克隆【site-blog】"
cd -
git clone -b site-blog $githubUrl blog
find blog -name ".git" | xargs rm -Rf
mv -f blog/* release

#五、部署到【master】
echo "五、部署到【master】"
cd release
git init
git add -A
git commit -m "${msg}"
git push -f $githubUrl master # 推送到coding

#六、删除生成文件
echo "六、删除生成文件"
cd - # 退回开始所在目录
rm -rf blog
rm -rf release

