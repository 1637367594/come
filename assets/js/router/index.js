import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Shop from '../components/shop/Home'
import Brands from '../components/shop/brands/Home'
import BrandsNew from '../components/shop/brands/New'
import BrandsEdit from '../components/shop/brands/Edit'
import Categories from '../components/shop/categories/Home'
import CategoriesNew from '../components/shop/categories/New'
import CategoriesEdit from '../components/shop/categories/Edit'
import Customers from '../components/shop/customers/Home'
import Products from '../components/shop/products/Home'
import ProductsNew from '../components/shop/products/New'
import ProductsEdit from '../components/shop/products/Edit'
import ProductsTrash from '../components/shop/products/Trash'
import Orders from '../components/shop/orders/Home'
import OrderShow from '../components/shop/orders/OrderShow'
import Expresses from '../components/shop/expresses/Home'
import ExpressesNew from '../components/shop/expresses/New'
import ExpressesEdit from '../components/shop/expresses/Edit'
import AdCategories from '../components/ads/adcategories/Home'
import Ads from '../components/ads/ad/Home'
import AdsNew from '../components/ads/ad/New'
import AdsEdit from '../components/ads/ad/Edit'
import AdsTrash from '../components/ads/ad/Trash'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },{
            path: '/shop',
            name: 'Shop',
            component: Shop
        },{
            path: '/shop/brands',
            name: 'Brands',
            component: Brands
        },{
            path: '/shop/brands/new',
            name: 'BrandsNew',
            component: BrandsNew
        },{
            path: '/shop/brands/edit/:id',
            name: 'BrandsEdit',
            component: BrandsEdit
        },{
            path: '/shop/categories',
            name: 'Categories',
            component: Categories
        },{
            path: '/shop/categories/new',
            name: 'CategoriesNew',
            component: CategoriesNew
        },{
            path: '/shop/categories/edit/:id',
            name: 'CategoriesEdit',
            component: CategoriesEdit
        },{
            path: '/shop/customers',
            name: 'Customers',
            component: Customers
        },{
            path: '/shop/products',
            name: 'Products',
            component: Products
        },{
            path: '/shop/products/new',
            name: 'ProductsNew',
            component: ProductsNew
        },{
            path: '/shop/products/edit/:id',
            name: 'ProductsEdit',
            component: ProductsEdit
        },{
            path: '/shop/products/trash',
            name: 'ProductsTrash',
            component: ProductsTrash
        },{
            path: '/shop/orders',
            name: 'Orders',
            component: Orders
        },{
            path: '/shop/orders/ordershow/:id',
            name: 'OrderShow',
            component: OrderShow
        },{
            path: '/shop/expresses',
            name: 'Expresses',
            component: Expresses
        },{
            path: '/shop/expresses/new',
            name: 'ExpressesNew',
            component: ExpressesNew
        },{
            path: '/shop/expresses/edit/:id',
            name: 'ExpressesEdit',
            component: ExpressesEdit
        },{
            path: '/ads/adcategories',
            name: 'AdCategories',
            component: AdCategories
        },{
            path: '/ads',
            name: 'Ads',
            component: Ads
        },{
            path: '/ads/new',
            name: 'AdsNew',
            component: AdsNew
        },{
            path: '/ads/edit/:id',
            name: 'AdsEdit',
            component: AdsEdit
        },{
            path: '/ads/trash',
            name: 'AdsTrash',
            component: AdsTrash
        }

    ]
})
