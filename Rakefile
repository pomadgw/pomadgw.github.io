
# Taken from http://ixti.net/software/2013/01/28/using-jekyll-plugins-on-github-pages.html

require "rubygems"
require "tmpdir"

require "bundler/setup"
require "jekyll"
require "uglifier"

# Change your GitHub reponame
GITHUB_REPONAME = "pomadgw/pomadgw.github.io"


def process_js(js_dir)
  Dir.foreach(js_dir) do |item|
    next if item == '.' or item == '..'
    # do work on real items
    path = js_dir + '/' + item
    puts path
    if File.file?(path) then
      res = Uglifier.new.compile(File.read(path))
      fo = File.open(path, 'w')
      fo.write(res)
      fo.close
    else
      process_js(path)
    end
  end
end

desc "Generate blog files"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
  js_dir = '_site/js'
  puts
  process_js js_dir
end


desc "Generate and publish blog to gh-pages"
task :publish => [:generate] do
  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp

    pwd = Dir.pwd
    Dir.chdir tmp

    system "git init"
    system "git add ."
    message = "Site updated at #{Time.now.utc}"
    system "git commit -m #{message.inspect}"
    system "git remote add origin https://github.com:#{GITHUB_REPONAME}.git"
    system "git push origin master --force"

    Dir.chdir pwd
  end
end
