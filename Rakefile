
# Taken from http://ixti.net/software/2013/01/28/using-jekyll-plugins-on-github-pages.html

require "rubygems"
require "tmpdir"

require "bundler/setup"
require "jekyll"
require "uglifier"

# Change your GitHub reponame
GITHUB_REPONAME = "pomadgw/pomadgw.github.io"
REPO_NAME = 'rianyusuf@pomadgw.xyz:repos/blog.git'

def process_js(js_dir)
  Dir.foreach(js_dir) do |item|
    next if item == '.' or item == '..' or File.extname(item) != '.js'
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

def process_css(css_dir)
  Dir.foreach(css_dir) do |item|
    next if item == '.' or item == '..' or File.extname(item) != '.css'
    # do work on real items
    path = css_dir + '/' + item
    puts path
    if File.file?(path) then
      system "cleancss -o #{path} #{path}"
    else
      process_css(path)
    end
  end

end

MONTH_NAMES = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "December"]

def write_template_file(path, permalink, title, options={})
  unless File.exists?(path)
    File.open(path, 'w') do |f|
      f.puts "---"
      f.puts "layout: archives"
      f.puts "permalink: '#{permalink}'"
      f.puts "redirect_from: 'archive/#{permalink}'"
      f.puts "title: '#{title}'"
      f.puts "exclude: true"
      options.each do |k, v|
          f.puts "#{k}: '#{v}'"
      end
      f.puts "---"
    end
    puts "created archive page for #{title}"
  end
end


desc "Generate template"
task :build_layout do
  rm_r './_layouts'
  Dir.chdir('_src') do
    puts "Generate layout"
    system 'yarn build'

    cp_r "dist", "../_layouts"
  end
end

desc "Generate pages for archive"
task :generate_archive => [:build_layout] do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process

  puts "Generate archive pages"

  # Create containing folders
  tags_folder_path = "archives/tags/"
  Dir.mkdir(tags_folder_path) unless File.exists?(tags_folder_path)
  dates_folder_path = "archives/dates/"
  Dir.mkdir(dates_folder_path) unless File.exists?(dates_folder_path)


  # Read Tags into array
  tags = []
  taglist_path = "./_site/archives/tagslist.txt"
  File.open(taglist_path, 'r') do |f|
    while tag = f.gets
      tag = tag.strip
      tags += [tag] unless tag == "" || tag == "\n"
    end
  end
  # Read Dates into array
  dates = []
  datelist_path = "./_site/archives/dateslist.txt"
  File.open(datelist_path, 'r') do |f|
    while date = f.gets
      date = date.strip
      dates += [{year: date[0..3], month: date[5..6], day: date[8..9]}] unless date == "" || date == "\n"
    end
  end

  # Create template files for each tag

  for tag in tags
    tagpath = tag.include?(' ') ? tag.downcase.gsub!(' ','-') : tag.downcase
    tagpage_path = tags_folder_path + "/#{tagpath}.md"
    write_template_file(tagpage_path, "tag/#{tagpath}/", tag, {tag: tag})
  end
  # Create template files for each year and month
  for date in dates
    yearpage_path = dates_folder_path + "/#{date[:year]}.md"
    write_template_file(yearpage_path, "#{date[:year]}/", date[:year], {year:"#{date[:year]}"})

    monthpage_path = dates_folder_path + "/#{date[:year]}-#{date[:month]}.md"
    month_name = "#{MONTH_NAMES[Integer(date[:month])]} #{date[:year]}"
    write_template_file(monthpage_path, "#{date[:year]}/#{date[:month]}/", month_name, {year: date[:year], month: date[:month]})
  end
  puts "Done generating archive pages"
end

desc "Generate blog files"
task :generate => [:generate_archive] do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => ".",
    "destination" => "_site"
  })).process
  js_dir = '_site/js'
  css_dir = '_site/css'
  puts
  process_js js_dir
  process_css css_dir
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
    system "git remote add origin #{REPO_NAME}"
    system "git push origin master --force"

    Dir.chdir pwd
  end
end
