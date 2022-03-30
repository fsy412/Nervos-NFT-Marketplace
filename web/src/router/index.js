import { createRouter, createWebHistory } from 'vue-router';
import Wallet from '../views/Wallet.vue';
import CreateCollection from '../views/CreateCollection.vue';
import NFTs from '../views/NFTs.vue';
import Create from '../views/Create.vue';
import NFTCreate from '../views/NFTCreate.vue';
import NFTSell from '../views/NFTSell.vue';
import NFTBuy from '../views/NFTBuy.vue';
import Test from '../views/Test.vue';
import MarketIndex from '../views/MarketIndex.vue';

const routes = [{
  path: '/',
  name: 'Index',
  component: MarketIndex
},
{
  path: '/wallet',
  name: 'Wallet',
  component: Wallet
},
{
  path: '/create_collection',
  name: 'create_collection',
  component: CreateCollection
},
{
  path: '/nfts/:contractAddress/:creator/:metaDataHash',
  name: 'nfts',
  component: NFTs,
  props: true
},
{
  path: '/test',
  name: 'test',
  component: Test
},
{
  path: '/market_index',
  name: 'market_index',
  component: MarketIndex,
},
{
  path: '/sell',
  name: 'Sell',
  component: NFTSell,
},
{
  path: '/buy/:tokenId/:nftAddress/:price/:creator/:isAuction/:itemId',
  name: 'Buy',
  component: NFTBuy,
},
{
  path: '/create',
  name: 'create',
  component: Create,
},
{
  path: '/create_nft/:contractAddress',
  name: 'create_nft',
  component: NFTCreate,
  props: true
}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.afterEach((to, from, next) => {
  window, scrollTo(0, 0)
})

export default router;
