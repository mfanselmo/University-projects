module UrlHelper
	require 'uri'

	def makelink(url)
	  '<a href="' + url + '">' + url + '</a>'
	end
end