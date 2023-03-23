import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Por favor preencher o seu nome completo .",
    },
    email: {
      type: String,
      required: "Por favor preencher com seu e-mail.",
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: '"Por favor preencher a senha.',
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: "",
    },
    birthDay: {
      type: Date,
      required: "Por favor preencher sua data de nascimento.",
    },
    phone: {
      type: String,
      required: "Por favor preencher com seu telefone.",
    },
    document: {
      type: String,
      required: "Por favor preencher com seu CPF.",
    },
    gender: {
      type: String,
      required: "Por favor preencher o gênero.",
    },
    address: [
      {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
    wishlist: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        style: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)
const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
