configure do
  # config stuff for you Sinatra app
  set :views, File.dirname(__FILE__) + '/views'
  set :public_folder, File.dirname(__FILE__) + '/public'

  Twitter.configure do |config|
    config.consumer_key = "9z2Vz3LRBsmrjqqtQ7k7BA"
    config.consumer_secret = "DBFnMDxcprx4ieovi9LodBLV0XyQqMACki8folrVDo"
    config.oauth_token = "7118662-aEPZCS20XizBvS4giCtZhOMska1FOG0ClZEc0NDxGE"
    config.oauth_token_secret = "kV7wLFihUlufGrgc0mXKYvYK0wqHvJF4zEbzukKo"
  end
end