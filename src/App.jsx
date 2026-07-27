import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CONTACT_LIMITS,
  sanitizeAustralianPhoneInput,
  validateContactDetails,
} from '../shared/contact-validation.js';

const asset = (fileName) => `/assets/${fileName}`;

const logoRows = [
  [
    [1, 108, 'full'],
    [2, 112],
    [3, 112],
    [4, 112],
    [5, 112],
    [6, 112],
    [7, 108],
    [8, 110],
    [9, 114],
    [10, 112],
    [11, 149],
    [12, 112],
  ],
  [
    [13, 112],
    [14, 112],
    [15, 90],
    [16, 89],
    [17, 99],
    [18, 112],
    [19, 114],
    [20, 112],
    [21, 105],
    [22, 108],
    [23, 112],
    [24, 112],
    [25, 116, 'full'],
  ],
];

const services = [
  {
    icon: 'icon-code.svg',
    title: 'Custom WordPress & Shopify',
    text: 'Flexible, scalable, and easy-to-use platforms.',
  },
  {
    icon: 'icon-window.svg',
    title: 'UX/UI Focus',
    text: 'Captivating designs that drive customers through your sales funnel.',
  },
  {
    icon: 'icon-layout.svg',
    title: 'Built for Growth',
    text: 'Integrated digital marketing and SEO to drive sustainable, long-term traffic.',
  },
  {
    icon: 'icon-zap.svg',
    title: '100% Ownership',
    text: 'Fully mobile-friendly, responsive, and 100% owned by you post-launch.',
  },
];

const caseStudies = [
  {
    stat: '180%',
    label: 'Increase in Conversion Rate',
    client: 'Briondo Rentals',
    image: 'case-1.webp',
    alt: 'Briondo Rentals case study',
  },
  {
    stat: '72%',
    label: 'Organic Search increase',
    client: 'Zabs Plumbing',
    image: 'case-2.webp',
    alt: 'Zabs Plumbing case study',
  },
  {
    stat: '180%',
    label: 'Increase in Organic Traffic',
    client: 'Appliance Repairs Online',
    image: 'case-3.webp',
    alt: 'Appliance Repairs Online case study',
  },
  {
    stat: '62%',
    label: 'Organic Growth in 6 Months',
    client: 'Briondo Rentals',
    image: 'case-4.webp',
    alt: 'Briondo Rentals organic growth case study',
  },
  {
    stat: '192%',
    label: 'Organic Traffic increase',
    client: 'Zabs Plumbing',
    image: 'case-5.webp',
    alt: 'Zabs Plumbing traffic case study',
  },
  {
    stat: '48%',
    label: 'Increase in Conversion Rate',
    client: 'Appliance Repairs Online',
    image: 'case-6.webp',
    alt: 'Appliance Repairs Online conversion case study',
  },
];

// The bento hero stamps the client name directly onto the photo, so it can only
// use case studies whose image carries that same client's branding. In case-4,
// case-5, and case-6 the visible logo belongs to a different company than the
// client named here (You Pack, Safecoat, Safe Surface), so those three are held
// back until the image/client pairings are corrected.
const bentoCaseStudies = caseStudies.slice(0, 3);

const testimonials = [
  {
    modifier: 't1',
    quote:
      'Such a great team to work with — professional, efficient, and incredibly talented. We worked with Design Point on our website and couldn’t be happier with the result. They brought our vision to life perfectly and made the whole process seamless. Absolutely love their work and highly recommend them!',
    name: 'Stephanie T.',
  },
  {
    modifier: 't2',
    quote:
      'Adrian, Akeel, and David were fantastic. What they created was beyond my expectations and within budget. Their communication was prompt and they understood exactly what I was looking for and were not afraid to experiment. I highly recommend the team at Design Point. I’ll definitely be a repeat customer.',
    name: 'Clara Higgins',
  },
  {
    modifier: '',
    quote:
      'Adrian from the team was extremely helpful. He completed the project ahead of the original deadline, was really understanding with all of my feedback and edits, and I would highly recommend Design Point.',
    name: 'Tom Everitt',
  },
  {
    modifier: 't4',
    quote:
      'Adrian and the team were brilliant. We had a bit of a deadline and at all points they were super strong. We gave them a budget and Adrian was great at managing the whole process for us. Communications were always on check and fast, which I loved. Highly recommend.',
    name: 'Vaughan Ryan',
  },
];

const faqs = [
  {
    question: 'How long does a typical custom build take?',
    answer:
      'Most custom builds require between 6 to 12 weeks from strategy alignment to launch, depending on complexity and features.',
  },
  {
    question: 'Will our website look like our competitors’ sites?',
    answer:
      'Never. We build completely bespoke design systems specifically for your brand value position. No templates, ever.',
  },
  {
    question: 'How do you guarantee speed optimisations?',
    answer:
      'We use clean component-based code, compress every media asset, and optimise against Google Core Web Vitals throughout the build.',
  },
  {
    question: 'Do you offer post-launch maintenance?',
    answer:
      'Yes, we provide ongoing conversion optimisation, A/B testing, security upgrades, and routine feature engineering support.',
  },
];

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window === 'undefined'
      ? false
      : window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return reducedMotion;
}

function Image({ file, alt = '', ...props }) {
  return <img src={asset(file)} alt={alt} loading="lazy" decoding="async" {...props} />;
}

function ArrowIcon() {
  return (
    <span className="arrow" aria-hidden="true">
      <Image file="arrow-hero.svg" alt="" />
    </span>
  );
}

function Rating() {
  return (
    <div className="rating" aria-label="Rated 5 out of 5 from 31 Google reviews">
      <div className="rating__google">
        <Image file="google.svg" alt="Google" />
      </div>
      <div className="rating__stars" aria-hidden="true">
        {Array.from({ length: 5 }, (_, index) => (
          <Image file="star.svg" alt="" key={index} />
        ))}
      </div>
      <p className="rating__text">
        5.0 | 31 <u>reviews</u>
      </p>
    </div>
  );
}

function ProposalButton({ className = '', children = 'Get a free website proposal', href = '#quote' }) {
  return (
    <a className={`btn ${className}`.trim()} href={href}>
      {children}
      <ArrowIcon />
    </a>
  );
}

function AltHeroLogoGrid({ reducedMotion }) {
  return (
    <section className="alt-hero__logos" aria-label="Client logos">
      <p>Trusted by Australia&apos;s Best</p>
      <div className="alt-hero__logo-rows">
        {logoRows.map((logos, rowIndex) => (
          <div
            className={`alt-hero__logo-row ${rowIndex === 1 ? 'alt-hero__logo-row--2' : ''}`.trim()}
            key={rowIndex}
          >
            <div className="alt-hero__logo-track">
              <LogoSet logos={logos} />
              {!reducedMotion && <LogoSet logos={logos} duplicate />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AlternateHeroPage({ reducedMotion }) {
  return (
    <>
      <main id="main">
      <section className="alt-hero" id="top">
      <div className="alt-hero__background" aria-hidden="true">
        <Image file="bg-wireframe.webp" alt="" />
      </div>

      <header className="alt-hero__nav">
        <a href="#top" className="alt-hero__logo" aria-label="Back to the top">
          <Image file="logo.webp" alt="Design Point" />
        </a>
        <div className="alt-hero__nav-actions">
          <a href="tel:1300123456">1300 123 456</a>
          <ProposalButton className="alt-hero__nav-cta" href="#quote" />
        </div>
      </header>

      <section className="alt-hero__stage" aria-labelledby="alt-hero-title">
        <div className="alt-hero__copy">
          <Rating />
          <h1 id="alt-hero-title">
            <span className="grad-text">We Design</span> High-Performance{' '}
            <span className="grad-text">Websites</span> That Perform and Convert—
            <span className="grad-text">Not Just Look Good.</span>
          </h1>
          <p className="alt-hero__proof">
            <strong>Backed by 12+ years of experience,</strong> our Melbourne-based team creates
            fast, secure, and powerful websites engineered for scalable, long-term growth.
          </p>
          <div className="alt-hero__cta">
            <p>Stop letting a clunky build hold your marketing back.</p>
            <ProposalButton className="btn--featured" href="#quote" />
          </div>
          <div className="alt-hero__usps">
            {[
              'Fast, secure & powerful websites optimised to convert',
              'Custom-developed solutions for your business needs',
              'Direct access to expert senior developers',
            ].map((usp) => (
              <div key={usp}>
                <Image file="check-circle.svg" alt="" />
                <p>{usp}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="alt-hero__media" aria-label="Design Point team member and client reviews">
          <Image className="alt-hero__media-background" file="hero-right-bg.webp" alt="" />
          <img
            className="alt-hero__person"
            fetchPriority="high"
            decoding="async"
            src={asset('hero-person.webp')}
            alt="Design Point team member"
          />
        </div>

        <AltHeroLogoGrid reducedMotion={reducedMotion} />
      </section>
      </section>
      <ProblemSection />
      <Services />
      <Results />
      <Testimonials reducedMotion={reducedMotion} />
      <Faq />
      <FinalCta />
      </main>
      <Footer />
    </>
  );
}

function EditorialHeroPage({ reducedMotion }) {
  const proofStat = caseStudies[0];
  const proofQuote = testimonials.find((item) => item.name === 'Tom Everitt') ?? testimonials[0];

  return (
    <>
      <main id="main">
        <section className="ed-hero" id="top">
          <header className="ed-hero__nav">
            <a href="#top" className="ed-hero__logo" aria-label="Back to the top">
              <Image file="logo.webp" alt="Design Point" />
            </a>
            <a className="ed-hero__nav-phone" href="tel:1300123456">
              1300 123 456
            </a>
          </header>

          <div className="ed-hero__stage">
            <div className="ed-hero__copy">
              <p className="ed-hero__eyebrow">Melbourne Web Design Studio</p>
              <h1 className="ed-hero__title">
                <span className="ed-hero__title-row">We Design</span>
                <span className="ed-hero__title-row ed-hero__title-row--accent">
                  High-Performance
                </span>
                <span className="ed-hero__title-row">Websites That Convert.</span>
              </h1>
              <p className="ed-hero__dek">
                Not just look good — <strong>engineered to sell.</strong> Twelve-plus years
                building fast, secure websites for Australian businesses ready to outgrow their
                current site.
              </p>
              <div className="ed-hero__actions">
                <ProposalButton className="btn--featured" href="#quote" />
                <Rating />
              </div>
            </div>

            <aside className="ed-hero__proof" aria-label="Client results">
              <div>
                <p className="ed-hero__proof-eyebrow">Real client result</p>
                <p className="ed-hero__proof-stat">{proofStat.stat}</p>
                <p className="ed-hero__proof-label">
                  {proofStat.label} — {proofStat.client}
                </p>
              </div>
              <div className="ed-hero__proof-divider" aria-hidden="true" />
              <div className="ed-hero__proof-quote">
                <Image file="quote.svg" alt="" aria-hidden="true" />
                <p>{proofQuote.quote}</p>
                <p className="ed-hero__proof-name">{proofQuote.name}</p>
              </div>
            </aside>
          </div>

          <div className="ed-hero__rule" aria-hidden="true" />
        </section>

        <LogoMarquee reducedMotion={reducedMotion} />
        <ProblemSection />
        <Services />
        <Results />
        <Testimonials reducedMotion={reducedMotion} />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

function BentoHeroPage({ reducedMotion }) {
  return (
    <>
      <main id="main">
        <section className="bento-hero" id="top">
          <header className="bento-hero__nav">
            <a href="#top" className="bento-hero__logo" aria-label="Back to the top">
              <Image file="logo.webp" alt="Design Point" />
            </a>
            <div className="bento-hero__nav-actions">
              <a className="bento-hero__nav-phone" href="tel:1300123456">
                1300 123 456
              </a>
              <ProposalButton className="bento-hero__nav-cta" href="#quote" />
            </div>
          </header>

          <div className="bento-hero__stage">
            <div className="bento-hero__copy">
              <p className="bento-hero__eyebrow">Real Results, Not Just Promises</p>
              <h1>
                We Design Websites That <span className="grad-text">Actually Perform.</span>
              </h1>
              <p className="bento-hero__dek">
                These are real client outcomes, not a stock template. See what a custom-built,
                conversion-focused site does for growth.
              </p>
              <div className="bento-hero__actions">
                <ProposalButton className="btn--featured" href="#quote" />
                <Rating />
              </div>
            </div>

            <ul className="bento-hero__grid" aria-label="Client results">
              {bentoCaseStudies.map((item, index) => (
                <li key={item.client + item.stat}>
                  <a className="bento-hero__tile" href="#results">
                    <img
                      className="bento-hero__tile-media"
                      src={asset(item.image)}
                      alt={item.alt}
                      decoding="async"
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : undefined}
                    />
                    <span className="bento-hero__tile-caption">
                      <span className="bento-hero__tile-stat">{item.stat}</span>
                      <span className="bento-hero__tile-metric">{item.label}</span>
                      <span className="bento-hero__tile-client">{item.client}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <LogoMarquee reducedMotion={reducedMotion} />
        <ProblemSection />
        <Services />
        <Results />
        <Testimonials reducedMotion={reducedMotion} />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bgwrap">
        <Image className="hero__bg" file="bg-wireframe.webp" alt="" />
      </div>
      <div className="hero__fade" />
      <div className="ellipse">
        <Image file="ellipse.svg" alt="" />
      </div>

      <header className="nav">
        <a href="#top" className="nav__logo" aria-label="Design Point home">
          <Image file="logo.webp" alt="Design Point" />
        </a>
        <div className="nav__right">
          <a className="nav__phone" href="tel:1300123456">
            <Image file="phone.svg" alt="" aria-hidden="true" />
            <span>1300 123 456</span>
          </a>
          <ProposalButton className="nav__cta" />
        </div>
      </header>

      <div className="hero__content">
        <div className="hero__row">
          <div className="hero__col">
            <Rating />
            <h1>
              <span className="grad-text">We Design</span>
              <span className="w"> High-Performance </span>
              <span className="grad-text">Websites</span>
              <span className="w"> That Perform and Convert</span>—
              <span className="grad-text">Not Just Look Good.</span>
            </h1>

            <div className="hero__lead">
              <div>
                <p>
                  <b>Backed by 12+ years of experience</b>
                  <span className="sep">,</span> our Melbourne-based team creates fast, secure,
                  and powerful websites engineered for scalable, long-term growth.
                </p>
                <p aria-hidden="true">&nbsp;</p>
                <p>
                  <b>
                    Stop letting a clunky build hold your{' '}
                    <span className="marketing-back-highlight">
                      marketing back
                      <span className="hero__arrow" aria-hidden="true">
                        <span className="hero__arrow-rot">
                          <Image file="arrow-curve.svg" alt="" />
                        </span>
                      </span>
                    </span>
                    .
                  </b>
                </p>
              </div>
              <ProposalButton className="btn--featured" />
            </div>
          </div>

          <div className="hero__media">
            <Image className="hero__media-bg" file="hero-right-bg.webp" alt="" />
            <img
              className="hero__person"
              fetchPriority="high"
              decoding="async"
              src={asset('hero-person.webp')}
              alt="Design Point team member"
            />
          </div>
        </div>

        <div className="hero__usps">
          {[
            'Fast, secure and powerful websites optimised to convert',
            'Custom-developed solutions for your business needs',
            'Direct access to expert senior developers',
          ].map((usp) => (
            <div className="usp" key={usp}>
              <Image file="check-circle.svg" alt="" />
              <p>{usp}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoSet({ logos, duplicate = false }) {
  return (
    <div className="marquee__set" aria-hidden={duplicate || undefined}>
      {logos.map(([number, width, className]) => (
        <div
          className={className || undefined}
          style={{ width }}
          key={`${number}-${duplicate ? 'duplicate' : 'original'}`}
        >
          <Image file={`logo-${String(number).padStart(2, '0')}.webp`} alt="" />
        </div>
      ))}
    </div>
  );
}

function LogoMarquee({ reducedMotion }) {
  return (
    <section className="marquee" aria-label="Client logos">
      <div className="marquee__inner">
        {logoRows.map((logos, rowIndex) => (
          <div
            className={`marquee__row ${rowIndex === 1 ? 'marquee__row--2' : ''}`.trim()}
            key={rowIndex}
          >
            <div className="marquee__track">
              <LogoSet logos={logos} />
              {!reducedMotion && <LogoSet logos={logos} duplicate />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState({ state: 'idle', message: '' });
  const [fieldErrors, setFieldErrors] = useState({});

  function focusFirstInvalidField(form, errors) {
    const firstInvalidField = ['fullname', 'email', 'phone'].find((name) => errors[name]);
    if (!firstInvalidField) return;

    window.requestAnimationFrame(() => form.elements.namedItem(firstInvalidField)?.focus());
  }

  function handleFieldBlur(event) {
    const { name, form } = event.currentTarget;
    const { errors } = validateContactDetails(Object.fromEntries(new FormData(form)));

    if (errors[name]) {
      setFieldErrors((currentErrors) => ({ ...currentErrors, [name]: errors[name] }));
    }
  }

  function handleFieldInput(event) {
    const { name } = event.currentTarget;

    setFieldErrors((currentErrors) => {
      if (!currentErrors[name]) return currentErrors;
      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });

    if (status.state !== 'idle' && status.state !== 'submitting') {
      setStatus({ state: 'idle', message: '' });
    }
  }

  function handlePhoneInput(event) {
    const phoneInput = event.currentTarget;
    const sanitizedValue = sanitizeAustralianPhoneInput(phoneInput.value);

    if (phoneInput.value !== sanitizedValue) {
      phoneInput.value = sanitizedValue;
    }

    handleFieldInput(event);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));
    const { errors } = validateContactDetails(formData);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus({ state: 'error', message: 'Please correct the highlighted fields and try again.' });
      focusFirstInvalidField(form, errors);
      return;
    }

    setFieldErrors({});
    setStatus({ state: 'submitting', message: 'Sending your request…' });
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15_000);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (result.errors && typeof result.errors === 'object') {
          setFieldErrors(result.errors);
          setStatus({ state: 'error', message: 'Please correct the highlighted fields and try again.' });
          focusFirstInvalidField(form, result.errors);
          return;
        }
        throw new Error(result.message || 'We could not send your request. Please try again.');
      }

      form.reset();
      setStatus({
        state: 'success',
        message: 'Thanks — your request is in. Our team will be in touch shortly.',
      });
    } catch (error) {
      setStatus({
        state: 'error',
        message:
          error instanceof DOMException && error.name === 'AbortError'
            ? 'This is taking longer than expected. Please try again or call 1300 123 456.'
            : error instanceof Error
              ? error.message
              : 'Something went wrong. Please try again.',
      });
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  const isSubmitting = status.state === 'submitting';

  return (
    <form
      className="form-card"
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
      aria-labelledby="contact-form-title"
      noValidate
    >
      <div className="form-card__header">
        <h3 id="contact-form-title">Let’s get your website going!</h3>
        <p>All fields are required.</p>
      </div>
      <div className="form-card__fields">
        <div className="field">
          <label htmlFor="fullname">
            Full name <span aria-hidden="true">*</span>
            <span className="sr-only"> required</span>
          </label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.fullname}
            required
            aria-invalid={fieldErrors.fullname ? 'true' : undefined}
            aria-describedby={fieldErrors.fullname ? 'fullname-error' : undefined}
            onBlur={handleFieldBlur}
            onInput={handleFieldInput}
          />
          {fieldErrors.fullname && (
            <p className="field__error" id="fullname-error">
              {fieldErrors.fullname}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">
            Email address <span aria-hidden="true">*</span>
            <span className="sr-only"> required</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={CONTACT_LIMITS.email}
            required
            aria-invalid={fieldErrors.email ? 'true' : undefined}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            onBlur={handleFieldBlur}
            onInput={handleFieldInput}
          />
          {fieldErrors.email && (
            <p className="field__error" id="email-error">
              {fieldErrors.email}
            </p>
          )}
        </div>
        <div className="field">
          <label htmlFor="phone">
            Phone number <span aria-hidden="true">*</span>
            <span className="sr-only"> required</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            maxLength={CONTACT_LIMITS.phone}
            placeholder="0412 345 678"
            title="Enter an Australian mobile, landline, 13, 1300, or 1800 number."
            required
            aria-invalid={fieldErrors.phone ? 'true' : undefined}
            aria-describedby={fieldErrors.phone ? 'phone-format phone-error' : 'phone-format'}
            onBlur={handleFieldBlur}
            onInput={handlePhoneInput}
          />
          <span className="sr-only" id="phone-format">
            Enter an Australian mobile, landline, 13, 1300, or 1800 number.
          </span>
          {fieldErrors.phone && (
            <p className="field__error" id="phone-error">
              {fieldErrors.phone}
            </p>
          )}
        </div>
        <div className="hp-field" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex="-1" autoComplete="off" />
        </div>
      </div>
      <div className="form-card__actions">
        <button className="btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending request…' : 'Get a free website proposal'}
          <ArrowIcon />
        </button>
        <p className="form-card__privacy">We’ll only use your details to respond to your enquiry.</p>
        <p
          className={`form-card__status ${status.state !== 'idle' ? `is-${status.state}` : ''}`.trim()}
          role={status.state === 'error' ? 'alert' : 'status'}
          aria-live={status.state === 'error' ? 'assertive' : 'polite'}
        >
          {status.message}
        </p>
      </div>
    </form>
  );
}

function ProblemSection() {
  return (
    <section className="problem" id="quote">
      <div className="problem__inner">
        <div className="problem__copy">
          <div className="problem__heading">
            <h2>
              <span className="grad-text">Is your current website</span>{' '}
              <span className="w">
                holding your{' '}
                <span className="marketing-highlight">
                  marketing
                  <span className="problem__underline" aria-hidden="true">
                    <Image file="underline.svg" alt="" />
                  </span>
                </span>{' '}
                back
              </span>
              <span className="grad-text">?</span>
            </h2>
          </div>
          <div className="body">
            <p>
              Cheap web development costs more long-term. If your online presence has an outdated
              aesthetic, a clunky backend, or slow loading speeds, you are actively losing
              customers to your competitors.
            </p>
            <p aria-hidden="true">&nbsp;</p>
            <p className="strong">
              You don&apos;t just need a digital brochure; you need the ultimate online sales tool.
            </p>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services">
      <Image className="sec-bg" file="bg-wireframe.webp" alt="" aria-hidden="true" />
      <div className="services__inner">
        <div className="services__head">
          <h2>
            <span className="grad-text">Web Design, The Way</span> It Should Be Done.
          </h2>
          <p>
            We combine exceptional UX design, clean coding practices, and data-driven conversion
            elements to capture your audience’s full attention.
          </p>
        </div>

        <div className="services__grid">
          {[services.slice(0, 2), services.slice(2)].map((row, rowIndex) => (
            <div className="services__row" key={rowIndex}>
              {row.map((service) => (
                <article className="card" key={service.title}>
                  <div className="icon-box">
                    <span>
                      <Image file={service.icon} alt="" />
                    </span>
                  </div>
                  <div className="card__text">
                    <h3>{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                </article>
              ))}
            </div>
          ))}
        </div>

        <div className="services__foot">
          <p className="grad-text">
            Every site we create{' '}
            <span className="w">
              is{' '}
              <span className="seo-ready-highlight">
                SEO-ready
                <span className="services__underline" aria-hidden="true">
                  <Image file="underline.svg" alt="" />
                </span>
              </span>{' '}
              from the ground up
            </span>, giving your optimisation <span className="w">a head start from day one.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Results() {
  return (
    <section className="results" id="results">
      <div className="results__inner">
        <div className="results__head">
          <h2>
            <span className="grad-text">Real Results</span>.
          </h2>
          <a className="results__link" href="#quote">
            <span className="grad-text">Discuss your project</span>
            <ArrowIcon />
          </a>
        </div>

        {[caseStudies.slice(0, 3), caseStudies.slice(3)].map((row, rowIndex) => (
          <div className="results__row" key={rowIndex}>
            {row.map((caseStudy) => (
              <article className="card" key={`${caseStudy.client}-${caseStudy.stat}`}>
                <div className="case__top">
                  <div className="case__stat">
                    <p className="num">{caseStudy.stat}</p>
                    <p className="label">{caseStudy.label}</p>
                  </div>
                  <p className="case__client grad-text">{caseStudy.client}</p>
                </div>
                <div className="case__img">
                  <Image file={caseStudy.image} alt={caseStudy.alt} />
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialSet({ duplicate = false }) {
  return (
    <div className="testimonials__set" aria-hidden={duplicate || undefined}>
      {testimonials.map((testimonial) => (
        <article
          className={`card testimonial ${testimonial.modifier}`.trim()}
          key={`${testimonial.name}-${duplicate ? 'duplicate' : 'original'}`}
        >
          <div className="quote">
            <Image file="quote.svg" alt="" />
          </div>
          <p>{testimonial.quote}</p>
          <p className="name">{testimonial.name}</p>
        </article>
      ))}
    </div>
  );
}

function Testimonials({ reducedMotion }) {
  const [offscreen, setOffscreen] = useState(false);
  const viewportRef = useRef(null);

  useEffect(() => {
    if (reducedMotion || !viewportRef.current || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { rootMargin: '120px 0px' },
    );
    observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <section className="testimonials">
      <Image className="sec-bg" file="bg-wireframe.webp" alt="" aria-hidden="true" />
      <div className="testimonials__inner">
        <div className="testimonials__topline">
          <Rating />
        </div>

        <h2 className="grad-text">
          12+ years<span className="w"> helping business owners thrive.</span>
        </h2>

        <div
          className={`testimonials__viewport ${offscreen ? 'is-offscreen' : ''}`}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
          ref={viewportRef}
        >
          <div className="testimonials__row">
            <TestimonialSet />
            {!reducedMotion && (
              <>
                <TestimonialSet duplicate />
                <TestimonialSet duplicate />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="faq">
      <div className="faq__inner">
        <h2>Conversion-Optimised FAQ</h2>
        <div className="faq__list">
          {faqs.map((faq, index) => (
            <details className="card faq__item" open={index === 0} key={faq.question}>
              <summary>
                <h3>{faq.question}</h3>
                <Image file="plus.svg" alt="" />
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final">
      <Image className="sec-bg" file="bg-wireframe.webp" alt="" aria-hidden="true" />
      <div className="final__inner">
        <h2>
          Stop Losing Customers
          <br />
          to a Low-Performance Website
        </h2>
        <div className="final__underline">
          <Image file="underline-cta.svg" alt="" />
        </div>
        <p>
          Your free website proposal starts with a 45-minute strategy session with a senior
          Australian digital architect. We&apos;ll map your user paths, audit your speed, and find
          conversion leaks.
        </p>
      </div>
      <ProposalButton className="btn--featured" />
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#top" className="logo" aria-label="Back to the top">
              <Image file="logo.webp" alt="Design Point" />
            </a>
            <p>
              High-performance web engineering for commercially ambitious Australian businesses.
              Based proudly in Melbourne.
            </p>
          </div>
          <div className="footer__contact">
            <div>
              <Image file="map-pin.svg" alt="" />
              <p>Office 907, 9 Yarra St, South Yarra VIC 3141</p>
            </div>
            <div>
              <Image file="phone.svg" alt="" aria-hidden="true" />
              <p>
                <a href="tel:1300123456">1300 123 456</a>
              </p>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__rule">
            <Image file="footer-line.svg" alt="" />
          </div>
          <div className="footer__legal">
            <p>© 2026 DesignPoint Digital. Made in Melbourne. All rights reserved.</p>
            <nav aria-label="Legal">
              <a href="#privacy-policy">Privacy Policy</a>
              <a href="#terms-of-service">Terms of Service</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FloatingCta() {
  const [dismissed, setDismissed] = useState(false);
  const [nextSectionReached, setNextSectionReached] = useState(false);

  useEffect(() => {
    const nextSectionContent = document.querySelector('.problem__inner');
    let frame = 0;

    const syncPosition = () => {
      frame = 0;
      setNextSectionReached(
        Boolean(
          nextSectionContent &&
            nextSectionContent.getBoundingClientRect().top <= window.innerHeight,
        ),
      );
    };
    const scheduleSync = () => {
      if (!frame) frame = window.requestAnimationFrame(syncPosition);
    };

    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync);
    scheduleSync();

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
    };
  }, []);

  const visible = !dismissed && nextSectionReached;

  return (
    <aside
      className={`floating-cta-bar ${visible ? 'is-visible' : ''}`.trim()}
      aria-label="Website proposal"
      aria-hidden={visible ? undefined : true}
      inert={!visible}
    >
      <div className="floating-cta-bar__inner">
        <div className="floating-cta-bar__intro">
          <a className="floating-cta-bar__logo" href="#top" aria-label="Back to the top">
            <Image file="logo.webp" alt="Design Point" />
          </a>
          <p className="floating-cta-bar__message">
            <strong>Ready for a website that wins more business?</strong>
            <span className="grad-text">Get a tailored recommendation from our Melbourne team.</span>
          </p>
        </div>
        <div className="floating-cta-bar__actions">
          <a className="floating-cta-bar__phone" href="tel:1300123456">
            <Image file="phone.svg" alt="" />
            <span>1300 123 456</span>
          </a>
          <ProposalButton className="floating-cta-bar__button" />
          <button
            className="floating-cta-bar__dismiss"
            type="button"
            aria-label="Dismiss proposal bar"
            onClick={() => setDismissed(true)}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </aside>
  );
}

function usePageMotion(reducedMotion) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('logo-motion-ready', !reducedMotion);
    root.classList.toggle('testimonial-motion-ready', !reducedMotion);

    if (reducedMotion || !('IntersectionObserver' in window)) {
      root.classList.remove('motion-ready');
      return;
    }

    const targets = document.querySelectorAll(
      [
        '.problem__copy',
        '.form-card',
        '.services__head',
        '.services__row .card',
        '.services__foot',
        '.results__head',
        '.results__row .card',
        '.testimonials__topline',
        '.testimonials__inner > h2',
        '.testimonials__viewport',
        '.faq__inner > h2',
        '.faq__item',
        '.final__inner',
        '.final > .btn',
        '.footer__top',
        '.footer__bottom',
      ].join(','),
    );

    root.classList.add('motion-ready');
    const groupIndexes = new WeakMap();

    targets.forEach((target) => {
      const parent = target.parentElement;
      const index = groupIndexes.get(parent) || 0;
      groupIndexes.set(parent, index + 1);
      target.classList.add('reveal');
      target.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -8% 0px' },
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
      root.classList.remove('motion-ready', 'logo-motion-ready', 'testimonial-motion-ready');
      targets.forEach((target) => {
        target.classList.remove('reveal', 'is-visible');
        target.style.removeProperty('--reveal-delay');
      });
    };
  }, [reducedMotion]);
}

export default function App() {
  const reducedMotion = useReducedMotion();
  usePageMotion(reducedMotion);
  const pathname = window.location.pathname.replace(/\/$/, '');
  const heroVariant =
    pathname === '/hero-alt'
      ? 'alt'
      : pathname === '/hero-editorial'
        ? 'editorial'
        : pathname === '/hero-bento'
          ? 'bento'
          : 'default';

  const pageContent = useMemo(
    () => {
      if (heroVariant === 'alt') return <AlternateHeroPage reducedMotion={reducedMotion} />;
      if (heroVariant === 'editorial') return <EditorialHeroPage reducedMotion={reducedMotion} />;
      if (heroVariant === 'bento') return <BentoHeroPage reducedMotion={reducedMotion} />;

      return (
        <>
          <Hero />
          <LogoMarquee reducedMotion={reducedMotion} />
          <main id="main">
            <ProblemSection />
            <Services />
            <Results />
            <Testimonials reducedMotion={reducedMotion} />
            <Faq />
            <FinalCta />
          </main>
          <Footer />
        </>
      );
    },
    [heroVariant, reducedMotion],
  );

  const pageModifierClass =
    heroVariant === 'alt'
      ? 'page--alt-hero'
      : heroVariant === 'editorial'
        ? 'page--editorial-hero'
        : heroVariant === 'bento'
          ? 'page--bento-hero'
          : '';

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className={`page ${pageModifierClass}`.trim()}>{pageContent}</div>
      <FloatingCta />
    </>
  );
}
