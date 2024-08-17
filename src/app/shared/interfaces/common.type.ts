export interface Navlink {
    id: number;
    title: string;
    icon: string;
    path: string
}

export interface Product {
    _id?: string
    title: string
    description: string
    category: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    warrantyInformation: string
    shippingInformation: string
    availabilityStatus: string
    reviews: Review[]
    returnPolicy: string
    minimumOrderQuantity: number
    images: string[]
    thumbnail: string
    __v?: number
}

export interface Review {
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
    _id?: string
}

export interface Category {
    _id: string
    title: string
    description: string
    image: string
    createdAt: string
    __v: number
}
