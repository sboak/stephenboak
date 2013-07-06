require 'rubygems'
require 'sinatra'
require 'twitter'
#require 'haml'
require File.expand_path(File.dirname(__FILE__) + '/config')

class Project
  def initialize(name, code, type, desc, banner)
    @name=name
    @code=code
    @desc=desc
    @type=type
    @banner=banner
  end

  def get_name
    @name
  end

  def get_code
    @code
  end

  def get_desc
    @desc
  end

  def get_type
    @type
  end

  def get_banner
    @banner
  end
end

get '/' do
  @tweets = Twitter.user_timeline("sboak", :count => 5, :exclude_replies => false)
  @title = 'Home'
  @current_page = 'home'
  erb :index, :layout => :'index.layout'
end

get '/beekman' do
  erb :beekman
end

get '/boundary' do
  erb :boundary
end

get '/dragonfly' do
  erb :dragonfly
end
get '/helios' do
  erb :helios
end

get '/quid' do
  erb :quid
end

get '/riyadh' do
  erb :riyadh
end

get '/tankh2o' do
  erb :tankh2o
end














