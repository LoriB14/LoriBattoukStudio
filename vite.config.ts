import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import faq from './src/faq.json' with { type: 'json' }

/**
 * SEO: one site address drives canonical/OG tags, structured data,
 * robots.txt, sitemap.xml and llms.txt.
 * Set in .env (local) and Railway → Variables:
 *   VITE_SITE_URL       the live address, e.g. https://yourname.up.railway.app
 *   VITE_CONTACT_EMAIL  the public contact email (optional)
 */
function seo(siteUrl: string, contactEmail: string): Plugin {
  const url = siteUrl.replace(/\/+$/, '')
  const today = new Date().toISOString().slice(0, 10)

  const areas = ['Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham', 'Richmond Hill', 'Oakville', 'Aurora', 'Newmarket', 'Pickering', 'Ajax', 'Burlington']
  const services = [
    ['Custom website design and development', 'Custom-made websites for small businesses: designed around the business, fast on phones and set up for Google search.'],
    ['Online store development', 'E-commerce stores with product pages, filters, cart and Stripe checkout.'],
    ['Online booking systems', 'Online appointment booking with live availability, deposits or full payment, automatic reminders and JaneApp integration.'],
    ['AI website assistants', 'Chat assistants powered by Google Gemini that answer questions and recommend the right products or services.'],
  ]
  const social = ['https://www.linkedin.com/in/loribattouk/', 'https://github.com/LoriB14']

  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        '@id': `${url}/#business`,
        name: 'Lori Battouk Studio',
        alternateName: 'Lori Battouk',
        description:
          'Toronto web designer and frontend developer building custom websites, online stores, online booking systems and AI assistants for small businesses across the GTA.',
        url: `${url}/`,
        image: `${url}/og.png`,
        logo: `${url}/favicon.svg`,
        ...(contactEmail ? { email: contactEmail } : {}),
        address: { '@type': 'PostalAddress', addressLocality: 'Toronto', addressRegion: 'ON', addressCountry: 'CA' },
        geo: { '@type': 'GeoCoordinates', latitude: 43.6532, longitude: -79.3832 },
        areaServed: [{ '@type': 'AdministrativeArea', name: 'Greater Toronto Area' }, ...areas.map((name) => ({ '@type': 'City', name }))],
        founder: { '@id': `${url}/#lori` },
        knowsAbout: ['Web design', 'Frontend development', 'React', 'Next.js', 'E-commerce', 'Stripe', 'Online booking', 'AI chat assistants', 'Local SEO'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Web services for small businesses',
          itemListElement: services.map(([name, description]) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name, description, areaServed: 'Greater Toronto Area', provider: { '@id': `${url}/#business` } },
          })),
        },
        sameAs: social,
      },
      {
        '@type': 'Person',
        '@id': `${url}/#lori`,
        name: 'Lori Battouk',
        jobTitle: 'Web Designer and Frontend Developer',
        description: 'Web designer, frontend developer and computer science student in Toronto.',
        homeLocation: { '@type': 'City', name: 'Toronto' },
        worksFor: { '@id': `${url}/#business` },
        sameAs: social,
      },
      { '@type': 'WebSite', '@id': `${url}/#website`, url: `${url}/`, name: 'Lori Battouk Studio', inLanguage: 'en-CA', publisher: { '@id': `${url}/#business` } },
      {
        '@type': 'FAQPage',
        '@id': `${url}/#faq`,
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  }

  const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended']
  const robots = `# Everyone, including AI search crawlers, is welcome
User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${url}/sitemap.xml
`

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${url}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`

  const llms = `# Lori Battouk Studio

> Lori Battouk is a web designer and frontend developer in Toronto, Ontario, Canada, serving small businesses across the Greater Toronto Area (GTA). She designs and builds custom-made websites, online stores, online booking systems and AI website assistants. She is also a computer science student.

Website: ${url}/
${contactEmail ? `Contact: ${contactEmail}\n` : ''}LinkedIn: ${social[0]}
GitHub: ${social[1]}
Location: Toronto, Ontario, Canada. Serves ${areas.join(', ')} and the rest of the GTA, and works remotely.

## Who it's for

Small businesses such as clinics, salons, restaurants, cafés, bakeries, boutiques, studios and shops, plus people who need a personal portfolio website.

## Services

${services.map(([n, d]) => `- **${n}**: ${d}`).join('\n')}

## How a project works

1. A free call about the business, its customers and what the site needs to do.
2. Design first: the client sees and approves the design before anything is built.
3. Build: the site is built, payments and booking are connected, and it is tested on real phones.
4. Launch: the site goes live and the client is shown how to update it themselves.

## Tools

React, Next.js, TypeScript, Tailwind CSS, Stripe, Supabase, Google Gemini API, Vercel.

## FAQ

${faq.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}
`

  const contactLink = contactEmail ? `Email <a href="mailto:${contactEmail}">${contactEmail}</a> · ` : ''

  return {
    name: 'lori-seo',
    transformIndexHtml(html) {
      return html
        .replaceAll('__SITE_URL__', url)
        .replace('__CONTACT_LINK__', contactLink)
        .replace('<!--JSON-LD-->', `<script type="application/ld+json">${JSON.stringify(graph)}</script>`)
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      this.emitFile({ type: 'asset', fileName: 'llms.txt', source: llms })
    },
    configureServer(server) {
      const files: Record<string, [string, string]> = {
        '/robots.txt': [robots, 'text/plain'],
        '/sitemap.xml': [sitemap, 'application/xml'],
        '/llms.txt': [llms, 'text/plain'],
      }
      server.middlewares.use((req, res, next) => {
        const hit = req.url ? files[req.url] : undefined
        if (!hit) return next()
        res.setHeader('Content-Type', `${hit[1]}; charset=utf-8`)
        res.end(hit[0])
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  const siteUrl = env.VITE_SITE_URL || 'https://loribattoukstudio-production.up.railway.app'
  return {
    plugins: [react(), seo(siteUrl, env.VITE_CONTACT_EMAIL || '')],
  }
})
