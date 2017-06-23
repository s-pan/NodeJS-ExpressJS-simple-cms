var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var hotelsId = fs.readFileSync('./hotelsId.json');
var bodyParser = require('body-parser');


module.exports = {
    scrape: function(req, res, next){
                var restaurants = {};
                var listingIndex = 'default';
                var el = 0;
                var restaurantNames = []

                function createUrlList(){
                    console.log('yes')
                    var prom = new Promise(function(resolve, reject){
                        for (var i = 0; i <= 430; i = i + 30){   
                            var url = 'https://www.tripadvisor.co.uk/Restaurants-g186370-oa' + i + '-Bath_Somerset_England.html';
                        request(url, function(error, response, html){
                            if(error){
                                console.log(error);
                            }      
                            if(!error){
                                var $ = cheerio.load(html);
                  
                                $('.listing').each(function(index){
                                    var listingIndex = $(this).attr('id');
                                    var listingIndexClean = listingIndex.replace(/\D/g,'');
                                    var restaurantName = $(this).find('h3').text();

                                    restaurantName = restaurantName.trim()
                                    restaurantNames.push(restaurantName);
                                    restaurants[el] = {
                                        restaurantID: listingIndexClean,
                                        restaurantName: restaurantNames[el]
                                    }
                                    console.log(restaurants)
                                    fs.writeFile('./hotelsId.json', JSON.stringify(restaurants), 'utf-8', function(err){
                                        if(err){
                                            console.log(err)
                                        }
                                    })

                                    el += 1;
                                })
                            }
                        })        
                        }
                    resolve(restaurants)
                    })

                }

       
            createUrlList()

            res.end('ok')
    }
}