class ApplicationController < ActionController::API
  private

  def authenticate!
    token = extract_token
    user_id = token && JwtService.decode(token)
    @current_user = User.find_by(id: user_id)

    render json: { error: "Unauthorized" }, status: :unauthorized unless @current_user
  end

  def current_user
    @current_user
  end

  def extract_token
    header = request.headers["Authorization"]
    header&.split(" ")&.last
  end
end
