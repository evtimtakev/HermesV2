# HermesV2

**Social Media Crawler and Classifier** is a Python and Node.js based tool that allows you to crawl Twitter, Reddit, and Stack Overflow public APIs, collect data based on a search query, and classify the results using an AI model. The tool supports two types of prompts: sentiment analysis and content categorization. It helps you analyze social media content efficiently and gain valuable insights.

## Features

- **Multi-Platform Crawling:** Crawl data from Twitter, Reddit, and Stack Overflow public APIs.
- **Search Query:** Specify search queries to collect relevant data from social media platforms.
- **Sentiment Analysis:** Classify content based on sentiment to understand user opinions.
- **Content Categorization:** Categorize content into different topics for in-depth analysis.

## Prerequisites

- Python 3.x
- Node.js
- Pip (Python package manager)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/evtimtakev/HermesV2.git
    ```

2. Navigate to the project directory:

    ```bash
    cd HermesV2
    ```

3. Install Python dependencies:

    ```bash
    cd Ai
    ```

    ```bash
    source venv/bin/activate
    ```
   
    ```bash
    pip install -r requirements.txt
    ```

4. Install Node.js dependencies:
    ```bash
    cd Crawler
    ```

    ```bash
    cd api
    ```

    ```bash
    npm install
    ```

    ```bash
      cd ..
    ```
   ```bash
      cd social-media-crawler
    ```

    ```bash
      npm install
    ```

## Usage

1. **Configure API Keys:** Obtain API keys from Twitter, Reddit, and Stack Overflow. Update the configuration file `.env` with your API keys.

    ```code
   # Redit configurations
   #==============================>
   
   # Redit URL
   REDIT_URL=https://www.reddit.com
   
   # In which subreadit to search for posts and comments
   REDIT_SUBREDIT_NAME=
   #==============================/>
   
   # Stack overflow configuration
   #==============================>
   
   STACKOVERFLOW_URL=https://api.stackexchange.com/
   #==============================/>
   
   
   # Twitter configuration
   #==============================>
   # Enable twitter search
   ENABLE_TWITTER=true
   
   # Twitter URL
   TWITTER_API_URL=https://api.twitter.com
   TWITTER_URL=https://twitter.com
   
   # The AUTH TOKEN that we get from the dev account
   TWITTER_BEARER_TOKEN=
   
   # Language of the Tweet, if detected by Twitter. Returned as a BCP47 language tag.
   TWITTER_SEARCH_LANG=en
   #==============================/>
   
   # Enables S3 bucket upload
   UPLOAD_TO_S3=false
    ```

2. **Run the Crawler:**

    ```bash
      cd Crawler/social-media-crawler && npm run build
      cd Crawler/api && npm start
    ```

3. **Classify Content:**

    - **Sentiment Analysis:**

        ```bash
         cd Ai && source venv/bin/activate
         flask run
        ```

4. **View Results:**

   Make a POST API call to "http://127.0.0.1:5000/predict" with the folowing body:
   ```json
        {
           "prm": "s", // s - sentiment c - category
           "filter": -1, // -1 - negative 0 - neautral 1 - positive
           "content": [
                     {
                       "id": 1,
                       "text": "Text to calsify"
                     },
           ]
       }
   ```

## Use the API for search in by search terms
The crawler offer an API that you can use to call and collect social media posts
After configuring and running the application you can collect data by doing a HTTP POST request

Route: http://localhost:3000/v1/crawler/collect/data

Example request:
```
[
	{
		"id": "redit",
    "searchTerms": ["vmware", "help"],
		"filterAmount": "1",
		"filterUnit": "m"
	},
	{
    "id": "stackoverflow",
    "searchTerms": ["javascript"],
		"filterAmount": "1",
		"filterUnit": "2"
	},
	{
    "id": "twitter",
    "searchTerms": ["javascript"],
		"hashtagsInput": []
	}
]
```


## Contributing

If you want to contribute to this project and make it better, feel free to submit a pull request. Your contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
