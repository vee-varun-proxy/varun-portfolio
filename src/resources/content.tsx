import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Varun",
  lastName: "Baker",
  name: `Varun Baker`,
  role: "Senior Drupal Software Engineer",
  avatar: "/images/avatar.jpg",
  email: "varun.baker+online@gmail.com",
  location: "America/New_York", // IANA timezone identifier for Eastern Time (New York)
  languages: ["English"],
};

const newsletter: Newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      Weekly insights on Drupal development, enterprise CMS platforms, accessibility,
      security, and building solutions for federal agencies and regulated industries
    </>
  ),
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  // Set essentials: true for links you want to show on the about page
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/varunity",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/varunbaker",
    essential: true,
  },
  {
    name: "Instagram",
    icon: "instagram",
    link: "https://www.instagram.com/varunbaker",
    essential: false,
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: (
    <>
      Building enterprise platforms with <Text as="span" size="xl" weight="strong">Drupal</Text>,{" "}
      <Text as="span" size="xl" weight="strong">React</Text>, and modern web technologies
    </>
  ),
  featured: {
    display: true,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Senior Drupal Engineer</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
      15+ years building software, 10+ years delivering{" "}
      <Text as="span" size="xl" weight="strong">Drupal</Text> platforms for federal agencies and
      regulated enterprises.{" "}
      <br /> Specializing in security, accessibility, CI/CD, and enterprise CMS solutions.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from Fairfax, VA`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Senior Drupal Software Engineer with 15+ years of software development experience
        and 10+ years delivering Drupal platforms for federal agencies and regulated enterprises.
        Proven technical lead for enterprise CMS platforms with deep expertise in security,
        Section 508/WCAG accessibility, CI/CD automation, performance optimization, and vendor
        coordination (Acquia, Pantheon). Experienced supporting mission-critical systems
        requiring Public Trust–level rigor. Contributor to the Drupal community and open source
        advocate.
      </>
    ),
  },
  work: {
    display: true,
    title: "Work Experience",
    experiences: [
      {
        company: "Express Scripts, The Cigna Group",
        timeframe: "June 2024 - Present",
        role: "Senior Drupal Developer",
        achievements: [
          <>
            Served as senior technical lead for enterprise Drupal platforms supporting
            healthcare systems in highly regulated environments, leading Drupal core and
            contributed module updates (10 → 11) with full regression testing and
            zero-downtime deployments.
          </>,
          <>
            Owned release management across 15+ production deployments, including
            configuration synchronization, rollback planning, and deployment runbooks
            for mission-critical healthcare platforms.
          </>,
          <>
            Implemented accessibility-first development practices, remediating WCAG and
            Section 508 issues across public and administrative interfaces, ensuring
            compliance for healthcare websites serving thousands of users.
          </>,
          <>
            Integrated enterprise identity solutions including SAML-based SSO and MFA
            across 8+ healthcare platforms (eCMS, Evernorth, EviCore, Quallent, MDLIVE),
            supporting thousands of authenticated users.
          </>,
          <>
            Partnered with security teams to remediate vulnerabilities identified through
            automated scans, implementing enterprise security features including CSP
            configurations, OneTrust integration, and HIPAA compliance measures.
          </>,
          <>
            Designed and maintained CI/CD pipelines supporting automated builds, tests, and
            deployments, improving platform performance through frontend optimization and
            responsive design strategies.
          </>,
        ],
        images: [],
      },
      {
        company: "Zyxware Technologies",
        timeframe: "January 2019 - May 2024",
        role: "Senior Software Engineer (React/Drupal)",
        achievements: [
          <>
            Led modernization and migration of 30+ Drupal 10 websites for Arizona
            Strategic Enterprise Technology (ASET) Office on Pantheon Cloud, coordinating
            deployments across multiple environments and resulting in a 61% decrease in
            support costs.
          </>,
          <>
            Spearheaded development and implementation of a Drupal 10-based distribution
            for the State of Arizona, conducting requirements gathering sessions to craft
            expert digital experience design for 170+ state agencies.
          </>,
          <>
            Collaborated with cross-functional teams to streamline processes, leading to
            a 100% reduction of delays in project delivery timeline through improved CI/CD
            pipeline deployment automation from git repositories to Acquia Drupal Cloud
            and Pantheon hosting environments.
          </>,
          <>
            Extended USWDS-based Drupal themes to meet federal frontend, accessibility, and
            usability standards, leading accessibility remediation efforts to ensure
            compliance with Section 508 and WCAG standards across federal platforms.
          </>,
          <>
            Rebuilt the integrated gateway for filing and serving documents for the Office
            of the Chief Information Officer (OCIO) of the U.S. Department of Labor,
            implementing logic and robust caching mechanisms for refactored File/eServe
            User Dashboard communicating with Appian API.
          </>,
          <>
            Contributed the Google Analytics Dashboard module to Drupal.org, creating
            over 12 mobile-friendly custom website designs by extending SASS-based Barrio
            Bootstrap theme.
          </>,
        ],
        images: [],
      },
      {
        company: "Digital Development International LLC",
        timeframe: "November 2011 - December 2018",
        role: "CTO",
        achievements: [
          <>
            Developed and deployed Open Data Portals for the Governments of Jamaica and
            St. Lucia based on Drupal 7, later upgrading Jamaica's portal to Drupal 10
            with a decoupled JavaScript (React) front-end.
          </>,
          <>
            Utilized Amazon Web Services including VPC, Route 53, RDS, EC2, ECS/EKS
            Container, S3, CloudWatch, CloudFront, and Snowflake to architect end-to-end
            solutions for clients, leveraging business intelligence tools for processing
            large datasets including financial data.
          </>,
          <>
            Designed custom APIs to support both mobile applications and desktop users,
            authored automation scripts for test results and analysis after load and
            security testing to ensure high performance and responsiveness.
          </>,
          <>
            Integrated version control systems with GitHub and managed website deployment
            using Drush, building scalable solutions for government and enterprise clients.
          </>,
        ],
        images: [],
      },
      {
        company: "OpenConcept Consulting Inc.",
        timeframe: "September 2008 - October 2011",
        role: "Consultant",
        achievements: [
          <>
            Developed customized web applications based on business needs, interacting
            directly with clients to specify requirements and keeping stakeholders updated
            on project status throughout implementation phases.
          </>,
          <>
            Enabled streamlined content translation for Drupal websites to support
            multilingual content in English, French, Hebrew, and Arabic with both
            left-to-right and right-to-left frontend support.
          </>,
          <>
            Adjusted front-end code for Drupal-based web applications to meet WCAG 2.0
            Accessibility Standards, creating the first OpenConcept installation profile
            to save time when starting new Drupal projects.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true,
    title: "Education & Certifications",
    institutions: [
      {
        name: "University of the West Indies, Mona",
        description: (
          <>
            BSc. Computer Science and Electronics (double major), 2002-2006. Graduated
            with honors from the Faculty of Pure and Applied Sciences.
          </>
        ),
      },
      {
        name: "Acquia Certified Site Builder - Drupal 9",
        description: (
          <>
            Certified Drupal 9 Site Builder, demonstrating expertise in building and
            configuring Drupal sites using Acquia's platform and best practices.
          </>
        ),
      },
      {
        name: "Scrum Fundamentals Certified (SFC™)",
        description: (
          <>
            Certified in Scrum fundamentals, enabling effective agile project management
            and collaboration in cross-functional teams.
          </>
        ),
      },
      {
        name: "Udemy Machine Learning A-Z™",
        description: (
          <>
            Hands-On Python & R In Data Science certification, covering machine learning
            fundamentals and practical applications.
          </>
        ),
      },
    ],
  },
  technical: {
    display: true,
    title: "Technical skills",
    skills: [
      {
        title: "Enterprise Drupal & CMS",
        description: (
          <>
            Deep expertise in Drupal 7-11, custom and contributed modules, configuration
            management, multisite architectures, Acquia Drupal Cloud, Pantheon, Drush,
            Composer, content workflows, moderation, and publishing automation. Acquia
            Certified Site Builder with proven experience leading enterprise platform
            migrations and upgrades.
          </>
        ),
        tags: [
          {
            name: "Drupal",
            icon: "drupal",
          },
          {
            name: "PHP",
            icon: "php",
          },
          {
            name: "Drush",
            icon: "terminal",
          },
        ],
        images: [],
      },
      {
        title: "Frontend Development",
        description: (
          <>
            Building modern, responsive user interfaces with React, TypeScript, JavaScript,
            jQuery, HTML5, CSS, SASS, LESS, and component libraries. Experience with USWDS
            (U.S. Web Design System) for federal platforms and mobile-first development
            strategies.
          </>
        ),
        tags: [
          {
            name: "React",
            icon: "react",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
        ],
        images: [],
      },
      {
        title: "Security, Identity & Compliance",
        description: (
          <>
            Implementing enterprise security solutions including SAML, OAuth2, MFA, LDAP,
            IAM, CSP, vulnerability remediation, OWASP mitigation, HIPAA compliance, and
            federal security scan remediation. Experience with OneTrust integration and
            Public Trust-level security requirements.
          </>
        ),
        tags: [
          {
            name: "SAML",
            icon: "lock",
          },
          {
            name: "OAuth2",
            icon: "lock",
          },
        ],
        images: [],
      },
      {
        title: "Accessibility & QA",
        description: (
          <>
            Expert in Section 508 and WCAG 2.1 AA compliance, conducting accessibility
            audits and remediation across public and administrative interfaces. Experience
            with Cypress automated testing and accessibility-first development practices
            for federal and healthcare platforms.
          </>
        ),
        tags: [
          {
            name: "WCAG",
            icon: "accessibility",
          },
          {
            name: "Section 508",
            icon: "accessibility",
          },
        ],
        images: [],
      },
      {
        title: "DevOps & Cloud Infrastructure",
        description: (
          <>
            Designing and maintaining CI/CD pipelines for automated builds, tests, and
            deployments. Extensive AWS experience (VPC, Route 53, RDS, EC2, ECS/EKS, S3,
            CloudWatch, CloudFront, Snowflake). Coordinating with hosting vendors (Acquia,
            Pantheon) for platform optimization and deployment automation.
          </>
        ),
        tags: [
          {
            name: "AWS",
            icon: "aws",
          },
          {
            name: "CI/CD",
            icon: "git",
          },
        ],
        images: [],
      },
      {
        title: "Languages & Additional Technologies",
        description: (
          <>
            Proficient in Python, PHP, SQL, HTML5, CSS, JavaScript, C++, bash, NoSQL,
            TypeScript, ReactJS, jQuery, Solidity, Java. Experience with business
            intelligence tools, ETL processes, API development, and data visualization
            with Chart.js.
          </>
        ),
        tags: [
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "SQL",
            icon: "database",
          },
          {
            name: "Java",
            icon: "java",
          },
        ],
        images: [],
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about Drupal, enterprise CMS, and federal web development",
  description: `Technical insights, tutorials, and thoughts on Drupal development, accessibility, security, and building platforms for regulated environments`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
