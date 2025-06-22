import ShopFooter from '@/components/layout/shop-footer';
import ShopHeader from '@/components/layout/shop-header';
import ShopSidebar from '@/components/layout/shop-sidebar';
import styles from './shop-layout.module.css';

interface ShopLayoutProps {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <div className={styles.shopLayout}>
      <ShopHeader />
      <div className={styles.contentWrapper}>
        <ShopSidebar />
        <main className={styles.mainContent}>{children}</main>
      </div>
      <ShopFooter />
    </div>
  );
}
