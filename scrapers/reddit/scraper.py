import praw
import csv
import requests
import re
import collections
import pymongo
from pymongo import MongoClient
import bson
import time
import traceback
from dotenv import load_dotenv
load_dotenv()
import os
import sys
from datetime import datetime

#Connecting pymongo to the proper collection in my database
myClient = pymongo.MongoClient((os.environ.get("MONGODB_URI")))
db = myClient["redditscraper"]
topstocks = db["topstocks"] #our DB collection

#API credentials for heroku deployment, stored in heroku config:
reddit = praw.Reddit(client_id=os.environ.get("client_id"), client_secret=os.environ.get("client_secret"), user_agent=os.environ.get("user_agent"))

#Defining a class for a Reddit Post, so we can later insert into DB
class Post(object):
    def __init__(self, postID, postURL, ups, downs, numComments, stock, time_posted, subreddit):
        self.postID = postID
        self.url = postURL
        self.stock = stock
        self.ups = ups
        self.downs = downs
        self.numComments = numComments
        self.time_posted = time_posted
        self.subreddit = subreddit

#Citation: found some of the scraper functionality on an article, cannot find it now (was for a website in C#, so a bit different)
#Defining a class for the scraper that will go through posts in the subreddits
class Scraper:
    def __init__(self, sub, sort='new', lim=900):
        self.sub = sub
        self.sort = sort
        self.lim = lim

        print(f'Scraper created searching subreddit {sub}, sorting by {sort}, limit = {lim} posts')

    #Determining which posts to sort through (new vs. top vs. hot)
    def set_sort(self):
        if self.sort == 'new':
            return self.sort, reddit.subreddit(self.sub).new(limit=self.lim)
        elif self.sort == 'top':
            return self.sort, reddit.subreddit(self.sub).top(limit=self.lim)
        elif self.sort == 'hot':
            return self.sort, reddit.subreddit(self.sub).hot(limit=self.lim)
        else:
            self.sort = 'hot'
            print('Sort method was not recognized, defaulting to hot.')
            return self.sort, reddit.subreddit(self.sub).hot(limit=self.lim)        

    #Function for finding posts with valid tickers and adding them to our DB
    def get_posts(self, collection):

        #Opening our CSV with all the stock tickers
        stockTickers = {}
        #stockTickers = set()
        with open('scrapers/reddit/tickers.csv', mode='r') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                stockTickers[row[0].split(',')[0]] = {}

        sort, subreddit = self.set_sort()

        #Adding posts that match to an array containing Post objects
        print(f'Collecting information from r/{self.sub}. sorting by {self.sort}')
        mentionedStocks = []
        i = 0
        for post in subreddit:
            i += 1
            print(f'Checking post # {i}')
            for stock in stockTickers.keys():
                if(re.search(r'\s+\$?' + stock + r'\$?\s+', post.selftext) or re.search(r'\s+\$?' + stock + r'\$?\s+',  post.title)):
                    stockTickers[stock][post.id] = Post(post.id, post.permalink, post.ups, post.downs, post.num_comments, stock, str(datetime.now()), self.sub)
    #End citation
        
        for stock in stockTickers: #stockTickers is the WHOLE list (make more efficient in future)
            if (len(stockTickers[stock]) > 0):
                for post in stockTickers[stock]:
                    mentionedStocks.append(stockTickers[stock][post]) #our array of Post objects possibly containing stocks
                    currentStock = stockTickers[stock][post]
                    numPostsWithStock = collection.count_documents({"url": currentStock.url, "stock": currentStock.stock})

                    #Checking to see if a post is already in our collection -- if it is, then we update the upvotes, downvotes, number of comments
                    if (numPostsWithStock == 0):
                        collection.insert_one(currentStock.__dict__)
                        collection.update_one({"url": currentStock.url, "stock": currentStock.stock},{"$set": {"time_posted": datetime.now()}}) 

                    #If the doc doesn't already exist: insert instead, set the current datetime 
                    else:
                        collection.update_one({"url": currentStock.url, "stock": currentStock.stock}, {"$set": {"ups": currentStock.ups, "downs": currentStock.downs, "numComments": currentStock.numComments}}, upsert=False)
                       
if __name__ == '__main__':
    while True:
        try:
            #Run through the hot and new sections of specified subreddits
            Scraper('wallstreetbets', lim=50, sort='hot').get_posts(topstocks)
            Scraper('wallstreetbets', lim=50, sort='new').get_posts(topstocks)
            Scraper('stocks', lim=50, sort='hot').get_posts(topstocks)
            Scraper('stocks', lim=50, sort='new').get_posts(topstocks)
            Scraper('daytrading', lim=50, sort='hot').get_posts(topstocks)
            Scraper('daytrading', lim=50, sort='new').get_posts(topstocks)
            Scraper('investing', lim=50, sort='hot').get_posts(topstocks)
            Scraper('investing', lim=50, sort='new').get_posts(topstocks)
            Scraper('pennystocks', lim=50, sort='hot').get_posts(topstocks)
            Scraper('pennystocks', lim=50, sort='new').get_posts(topstocks)
            print("Going to sleep for a sec")
            time.sleep(1)
            # topstocks.delete_many({}) #only for testing DB
            # print('Cleared DB')

        #Exception for when reddit servers go down (happens about once per day)
        except Exception:
            traceback.print_exc()
            print("Going to sleep for 10 seconds")
            time.sleep(10)


