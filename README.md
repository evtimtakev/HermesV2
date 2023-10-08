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
   # Enable Redit Search
   ENABLE_REDIT=true
   
   # Redit URL
   REDIT_URL=https://www.reddit.com
   
   # In which subreadit to search for posts and comments
   REDIT_SUBREDIT_NAME=
   
   # Search term
   REDIT_SUBREDIT_SEARCH_TERMS=
   
   # Time filter that will fetch post in a specific time period from today
   # Example:
   #   1 month back from today
   #   1 year back from today
   #   1 week back from today
   #
   # Time period unit.
   # Possible options:
   # y - year,
   # m - month,
   # w - week
   REDIT_TIME_SPAN_FILTER_UNIT=m
   # The amount of week, month, years to go back from today.
   # Example:
   # 1w
   # 1m
   # 4y
   REDIT_TIME_SPAN_FILTER_AMOUNT=6
   #==============================/>
   
   # Stack overflow configuration
   #==============================>
   # Enable stackoveflow search
   ENABLE_STACKOVERFLOW=true
   
   STACKOVERFLOW_URL=https://api.stackexchange.com/
   
   STACKOVERFLOW_SEARCH_TERMS=
   
   # Time filter that will fetch post in a specific time period from today
   # Example:
   #   1 month back from today
   #   1 year back from today
   #   1 week back from today
   #
   # Time period unit.
   # Possible options:
   # y - year,
   # m - month,
   # w - week
   STACKOVERFLOW_TIME_SPAN_FILTER_UNIT=y
   # The amount of week, month, years to go back from today.
   # Example:
   # 1w
   # 1m
   # 4y
   STACKOVERFLOW_TIME_SPAN_FILTER_AMOUNT=1
   #==============================/>
   
   
   # Twitter configuration
   #==============================>
   # Enable twitter search
   ENABLE_TWITTER=true
   
   # Twitter URL
   TWITTER_API_URL=https://api.twitter.com
   TWITTER_URL=https://twitter.com
   
   # Hashtags - support multiple hashtags connected with logical OR in the query. The value that is accepted is hatags with ",".
   # For example: TWITTER_SEARCH_BY_HASHTAGS=
   TWITTER_SEARCH_BY_HASHTAGS=
   # Up to 6 search terms. The search terms are term space which mans AND then another term and so on
   TWITTER_SEARCH_BY_TERMs=
   
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

   Make a POST API call to "http://127.0.0.1:3000/v1/ai/classify" with the folowing body:
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

## Contributing

If you want to contribute to this project and make it better, feel free to submit a pull request. Your contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
