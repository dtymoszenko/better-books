class Api::AuthController < ApplicationController
  def register
    user = User.new(email: params[:email], password: params[:password])

    if user.save
      token = JwtService.encode(user.id)
      render json: { token: token, user: serialize_user(user) }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email]&.downcase)

    if user&.authenticate(params[:password])
      token = JwtService.encode(user.id)
      render json: { token: token, user: serialize_user(user) }
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def me
    authenticate!
    render json: { user: serialize_user(current_user) }
  end

  private

  def serialize_user(user)
    { id: user.id, email: user.email, created_at: user.created_at }
  end
end
