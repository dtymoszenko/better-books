# app/services/google_books_client.rb
require "net/http"
require "json"
require "uri"

class GoogleBooksClient
  BASE_URL = "https://www.googleapis.com/books/v1/volumes".freeze

  def self.search(query, max_results: 10)
    return [] if query.to_s.strip.empty?

    uri = URI(BASE_URL)

    params = {
      q: query,
      maxResults: max_results
    }

    api_key = Rails.application.credentials.dig(:google_books, :api_key) || ENV["GOOGLE_BOOKS_API_KEY"]
    params[:key] = api_key if api_key.present?

    uri.query = URI.encode_www_form(params)

    response = Net::HTTP.get_response(uri)

    unless response.is_a?(Net::HTTPSuccess)
      raise "Google Books API error: #{response.code} #{response.message}"
    end

    data = JSON.parse(response.body)
    items = data["items"] || []

    items.map do |item|
      info = item["volumeInfo"] || {}
      sale_info = item["saleInfo"] || {}
      image_links = info["imageLinks"] || {}

      {
        google_books_id: item["id"],
        title: info["title"],
        authors: info["authors"] || [],
        description: info["description"],
        published_date: info["publishedDate"],
        publisher: info["publisher"],
        page_count: info["pageCount"],
        categories: info["categories"] || [],
        average_rating: info["averageRating"],
        ratings_count: info["ratingsCount"],
        thumbnail: image_links["thumbnail"],
        small_thumbnail: image_links["smallThumbnail"],
        preview_link: info["previewLink"],
        info_link: info["infoLink"],
        isbn_10: extract_isbn(info["industryIdentifiers"], "ISBN_10"),
        isbn_13: extract_isbn(info["industryIdentifiers"], "ISBN_13"),
        saleability: sale_info["saleability"]
      }
    end
  end

  def self.extract_isbn(identifiers, type)
    return nil unless identifiers.is_a?(Array)

    match = identifiers.find { |id| id["type"] == type }
    match&.dig("identifier")
  end

  private_class_method :extract_isbn
end