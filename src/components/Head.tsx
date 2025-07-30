import { env } from '@/config/env';
import { useEffect } from 'react';

interface Props {
  title: string;
  description?: string;
}

/**
 * Declarative component to set the document title and meta description.
 *
 * - Sets the document title as "{appName} | {title}" if a title is provided, or just "{appName}" otherwise.
 * - Sets or updates the meta description tag in the document head.
 *
 * Usage:
 *   <Head title="Page Title" description="Optional page description" />
 *
 * @param title - The page title to display in the browser tab.
 * @param description - (Optional) The meta description for SEO and social sharing.
 */
export const Head = ({ title, description }: Props) => {
  useEffect(() => {
    document.title =
      title.trim().length > 0 ? `${env.appName} | ${title}` : env.appName;

    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
};
