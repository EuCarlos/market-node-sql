export const productTable = [
    'id',
    'produto',
    'NCM',
    'unidade_comercial_produto',
    'preco_comercial_produto',
    'unidade_tributavel_produto',
    'preco_tributavel_produto',
    'CFOP',
    'CST',
    'origem',
    'situacao_tributaria',
    'regime',
    'PIS',
    'cofins',
    'cEan'
]

export const customerTable = [
    'name',
    'email',
    'phone_number',
    'cityId',
    'zip_code'
]

export const allRoutes = {
    documentation: "/docs",
    customers: [
        "[GET]: /customers",
        "[POST]: /customers",
        "[GET]: /customers/count",
        "[GET]: /customers/{customerId}",
        "[PUT]: /customers/{customerId}",
        "[DELETE]: /customers/{customerId}"
    ],
    purshases: [
        "[GET]: /customers/{customerId}/purchase",
        "[GET]: /customers/{customerId}/purchase/{purchaseId}",
        "[POST]: /customers/purchase/",
        "/customers/purchase/{purchaseId}"
    ],
    products: [
        "[GET]: /products",
        "[POST]: /products",
        "[GET]: /products/{productsId}",
        "[PUT]: /products/{productsId}",
        "[DELETE]: /products/{productsId}"
    ],
    cities: [
        "[GET]: /cities",
        "[GET]: /cities/{cityId}"
    ]

}