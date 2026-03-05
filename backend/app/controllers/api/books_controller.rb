class Api::BooksController < ApplicationController
  def search
    query = params[:q].to_s
    max_results = params[:max_results].to_i
    max_results = 10 if max_results <= 0
    max_results = 20 if max_results > 20

    results = GoogleBooksClient.search(query, max_results: max_results)

    render json: {
      query: query,
      count: results.length,
      results: results
    }
  rescue => e
    render json: { error: e.message }, status: :bad_gateway
  end
end