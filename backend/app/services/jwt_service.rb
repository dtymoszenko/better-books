class JwtService
  ALGORITHM = "HS256".freeze
  EXPIRY = 24 * 60 * 60 # 24 hours in seconds

  def self.encode(user_id)
    payload = {
      sub: user_id,
      iat: Time.now.to_i,
      exp: Time.now.to_i + EXPIRY
    }
    JWT.encode(payload, secret, ALGORITHM)
  end

  def self.decode(token)
    payload = JWT.decode(token, secret, true, { algorithm: ALGORITHM }).first
    payload["sub"]
  rescue JWT::ExpiredSignature, JWT::DecodeError
    nil
  end

  def self.secret
    Rails.application.credentials.secret_key_base
  end
  private_class_method :secret
end
