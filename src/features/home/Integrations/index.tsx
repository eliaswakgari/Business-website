"use client";

import { motion } from "framer-motion";
import { integrations, animationVariants } from "./config/integrations.config";
import { IntegrationCard } from "./components/IntegrationCard";

export default function Integrations() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container relative px-4 md:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Integrate with Your Favorite Tools
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            BusinessCMS connects with the tools you already use, making it easy to incorporate into your existing workflow.
          </p>
        </div>

        <motion.div
          className="mx-auto max-w-5xl grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          variants={animationVariants.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {integrations.map((integration, index) => (
            <IntegrationCard key={index} integration={integration} />
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            ...and many more integrations available
          </p>
          <a
            href="/contact"
            className="inline-flex items-center font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View all integrations
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
