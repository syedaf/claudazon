export interface LayoutLevel {
  key: string;
  name: string;
  color: string;
  active: boolean;
}

export interface ReviewData {
  id: number;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  helpful: number;
  verified: boolean;
}

export interface ProductReviewStats {
  totalReviews: number;
  averageRating: number;
  verifiedPercentage: number;
  responseRate: number;
  ratingBreakdown: RatingBreakdown[];
}

export interface RatingBreakdown {
  stars: number;
  count: number;
  percentage: number;
}

export interface SentimentData {
  month: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface KeywordData {
  word: string;
  mentions: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

export interface LayoutContextType {
  activeLayouts: string[];
  registerLayout: (key: string, name: string | null) => void;
}
