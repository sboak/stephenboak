require 'rubygems'
require 'sinatra'
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
  @projects = [
    Project.new("Boundary", "boundary", "web", "Tools to visualize, explore, and troubleshoot network performance with no hardware to install.", true),
    Project.new("Quid", "quid", "web", "Web application tracking the performance of private technology companies and allowing users to explore new and emerging companies and spaces.", false),
    Project.new("World Bank RAF", "raf", "web", "Tool for evaluating energy efficiency opportunities in developing cities by comparing key performance indicators against similar cities.", false),
    Project.new("Riyadh Region Dashboard","riyadh", "web", "Dashboard for government officials to monitor progress and spending on urban development projects around the Riyadh region.", false),
    Project.new("Dragonfly","dragonfly", "architecture", "Temporary installation at SCIArc inspired by the wing of a dragonfly, hand-made by students. Over 2,000lb of aluminum, attached at only 3 points in the room.", false),
    Project.new("Helios House","helios", "architecture", "Sustainable gas station in Los Angeles featuring solar power, a 100%-recycled steel canopy, rainwater collection, green roof, and LED lighting.", false),
    Project.new("New York by Gehry","beekman", "architecture", "Frank Gehry-designed high-rise in NYC featuring a doubly-curved two-layer curtain wall which I optimized for construction.", false),
    Project.new("Diabetic Foot Research","foot", "other", "Worked with the orthotics & prosthetics department to design an insole that significantly reduced ulceration in diabetic patients.", false),
    Project.new("Double-Vision Test","doublevision", "other", "Designed in 2003, partnership with a local ophthalmologist to replace the rudimentary paper test with a digital version. Awarded a provisional patent.", false),
    Project.new("Homemade iPod Case","ipod", "other", "Student project to build an iPod case out of acrylic on a 2.5-axis CNC mill. Wrote all the machine code and made dozens of prototypes.", false)
    ]
  @title = 'Home'
  @current_page = 'home'
  erb :index, :layout => :'index.layout'
end

get '/beekman' do
  haml :beekman
end

get '/boundary' do
  @title = 'Boundary'
  @current_page = 'boundary'
  haml :boundary, :layout => :'project.layout'
end

get '/boundaq' do
  haml :boundaq
end

get '/doublevision' do
  haml :doublevision
end

get '/dragonfly' do
  haml :dragonfly
end

get '/foot' do
  haml :foot
end

get '/helios' do
  haml :helios
end

get '/ipod' do
  haml :ipod
end

get '/quid' do
  haml :quid
end

get '/raf' do
  haml :raf
end

get '/riyadh' do
  haml :riyadh
end