module Api
  module V1
    class AuthController < Api::BaseController
      def register
        user = User.new(email: params[:email], password: params[:password])

        if user.save
          token = JwtService.encode(user.id)
          render json: { token: token, user: UserSerializer.new(user) }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def login
        user = User.find_by(email: params[:email]&.downcase)

        if user&.authenticate(params[:password])
          token = JwtService.encode(user.id)
          render json: { token: token, user: UserSerializer.new(user) }
        else
          render json: { error: "Invalid email or password" }, status: :unauthorized
        end
      end

      def me
        authenticate!
        render json: { user: UserSerializer.new(current_user) }
      end
    end
  end
end
