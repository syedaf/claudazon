import Link from 'next/link';
import styles from './shop-footer.module.css';

export default function ShopFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.mainFooter}>
          <div className={styles.footerGrid}>
            {/* Get to Know Us */}
            <div className={styles.footerColumn}>
              <h3 className={styles.columnTitle}>Get to Know Us</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/about" className={styles.footerLink}>
                    About Claudazon
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className={styles.footerLink}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/press" className={styles.footerLink}>
                    Press Releases
                  </Link>
                </li>
                <li>
                  <Link
                    href="/investor-relations"
                    className={styles.footerLink}
                  >
                    Claudazon Investor Relations
                  </Link>
                </li>
                <li>
                  <Link href="/science" className={styles.footerLink}>
                    Claudazon Science
                  </Link>
                </li>
              </ul>
            </div>

            {/* Make Money with Us */}
            <div className={styles.footerColumn}>
              <h3 className={styles.columnTitle}>Make Money with Us</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/sell" className={styles.footerLink}>
                    Sell products on Claudazon
                  </Link>
                </li>
                <li>
                  <Link href="/sell/services" className={styles.footerLink}>
                    Sell on Claudazon Business
                  </Link>
                </li>
                <li>
                  <Link href="/advertising" className={styles.footerLink}>
                    Sell apps on Claudazon
                  </Link>
                </li>
                <li>
                  <Link href="/affiliate" className={styles.footerLink}>
                    Become an Affiliate
                  </Link>
                </li>
                <li>
                  <Link href="/delivery" className={styles.footerLink}>
                    Advertise Your Products
                  </Link>
                </li>
              </ul>
            </div>

            {/* Claudazon Payment Products */}
            <div className={styles.footerColumn}>
              <h3 className={styles.columnTitle}>Claudazon Payment Products</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/rewards" className={styles.footerLink}>
                    Claudazon Business Card
                  </Link>
                </li>
                <li>
                  <Link href="/reload" className={styles.footerLink}>
                    Shop with Points
                  </Link>
                </li>
                <li>
                  <Link href="/currency" className={styles.footerLink}>
                    Reload Your Balance
                  </Link>
                </li>
                <li>
                  <Link href="/converter" className={styles.footerLink}>
                    Claudazon Currency Converter
                  </Link>
                </li>
              </ul>
            </div>

            {/* Let Us Help You */}
            <div className={styles.footerColumn}>
              <h3 className={styles.columnTitle}>Let Us Help You</h3>
              <ul className={styles.linkList}>
                <li>
                  <Link href="/account" className={styles.footerLink}>
                    Your Account
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className={styles.footerLink}>
                    Your Orders
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className={styles.footerLink}>
                    Shipping Rates & Policies
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className={styles.footerLink}>
                    Returns & Replacements
                  </Link>
                </li>
                <li>
                  <Link href="/help" className={styles.footerLink}>
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Logo and Language */}
        <div className={styles.logoSection}>
          <Link href="/" className={styles.logoLink}>
            <span className={styles.logo}>claudazon</span>
          </Link>
          <div className={styles.footerButtons}>
            <button className={styles.footerButton}>🌐 English</button>
            <button className={styles.footerButton}>
              💲 USD - U.S. Dollar
            </button>
            <button className={styles.footerButton}>🇺🇸 United States</button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className={styles.bottomFooter}>
          <div className={styles.bottomGrid}>
            <div className={styles.bottomColumn}>
              <Link href="/subsidiary1" className={styles.bottomLink}>
                Claudazon Music
              </Link>
              <p className={styles.bottomDescription}>
                Stream millions of songs
              </p>
            </div>
            <div className={styles.bottomColumn}>
              <Link href="/subsidiary2" className={styles.bottomLink}>
                Claudazon Advertising
              </Link>
              <p className={styles.bottomDescription}>
                Find, attract, and engage customers
              </p>
            </div>
            <div className={styles.bottomColumn}>
              <Link href="/subsidiary3" className={styles.bottomLink}>
                Claudazon Drive
              </Link>
              <p className={styles.bottomDescription}>
                Cloud storage from Claudazon
              </p>
            </div>
            <div className={styles.bottomColumn}>
              <Link href="/subsidiary4" className={styles.bottomLink}>
                Claudazon Prime
              </Link>
              <p className={styles.bottomDescription}>
                Free shipping, exclusive deals
              </p>
            </div>
          </div>
        </div>

        {/* Legal Footer */}
        <div className={styles.legalFooter}>
          <div className={styles.legalLinks}>
            <Link href="/conditions" className={styles.legalLink}>
              Conditions of Use
            </Link>
            <Link href="/privacy" className={styles.legalLink}>
              Privacy Notice
            </Link>
            <Link href="/interest-ads" className={styles.legalLink}>
              Interest-Based Ads
            </Link>
          </div>
          <p className={styles.copyright}>
            © 1996-2025, Claudazon.com, Inc. or its affiliates
          </p>
        </div>
      </div>
    </footer>
  );
}
