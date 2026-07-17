---
title: "NodeCommerce"
summary: "Bangladesh-wide demand forecasting across 64 districts and 495 upazilas — LightGBM quantile regression over a 111-feature set, a Neo4j knowledge graph with Node2Vec embeddings, FAISS similarity search, and an LLM layer, demoed live on a choropleth dashboard."
year: "2025"
category: "ml"
badge: "AI Buildfest placement"
stack: ["LightGBM", "Neo4j", "Node2Vec", "FAISS", "Python"]
links: {}
featured: true
order: 1
---

A demand-forecasting system covering all of Bangladesh — 64 districts and 495
upazilas. The core is a LightGBM quantile-regression model over a 111-feature
set, giving prediction intervals rather than point estimates.

Around the model sits a Neo4j knowledge graph with Node2Vec embeddings and FAISS
similarity search, so related regions and products inform each other's forecasts,
plus an LLM layer for querying the results in natural language. Demoed live with
a choropleth dashboard at AI Buildfest, where it placed.

<!-- TODO: add repo/demo links and confirm the exact Buildfest placement -->
