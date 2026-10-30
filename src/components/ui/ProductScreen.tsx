import Image from "next/image";
import { siteContent } from "@/content/site";

type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  placeholder: string;
  available: boolean;
};

type ProductScreenProps = {
  image: ProductImage;
  className?: string;
  compact?: boolean;
  priority?: boolean;
};

export function ProductScreen({
  image,
  className = "",
  compact = false,
  priority = false,
}: ProductScreenProps) {
  return (
    <figure
      className={`product-screen${compact ? " product-screen--compact" : ""} ${className}`.trim()}
    >
      {image.available ? (
        <>
          <div className="product-screen__chrome" aria-hidden="true">
            <span />
            <span />
            <span />
            <span className="product-screen__chrome-line" />
          </div>
          <Image
            className="product-screen__image"
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes={compact ? "(max-width: 767px) 42vw, 280px" : "(max-width: 767px) 100vw, 58vw"}
            priority={priority}
            loading={priority ? undefined : "lazy"}
          />
        </>
      ) : (
        <div className="product-screen__placeholder" role="img" aria-label={`${image.placeholder}. ${siteContent.accessibility.productScreenshotNote}`}>
          <span className="product-screen__placeholder-title">{image.placeholder}</span>
          <span className="product-screen__placeholder-note">{siteContent.accessibility.productScreenshotNote}</span>
        </div>
      )}
    </figure>
  );
}
