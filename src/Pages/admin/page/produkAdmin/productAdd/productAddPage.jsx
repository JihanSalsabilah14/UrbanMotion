import { motion } from "framer-motion";

import HeaderAdmin from "../../../componen/Header/headerAdmin";
import ButtonCRUD from "../../../componen/button/buttonCRUD";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";

import ProductAdd from "../../../componen/products/Add/productAdd";

const ProductsAddPage = () => {
  return (
    <div className="flex-1 overflow-auto relative uppercase ">
      <HeaderAdmin title=" Add Products" />

      <main className="bg-#F5F6FA max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}>
          <ProductAdd />
        </motion.div>
      </main>
    </div>
  );
};
export default ProductsAddPage;
