# Graph Report - issuebuddy  (2026-10-22)

## Corpus Check
- 3 files · ~1,536 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 2 file(s) not represented in the graph (top: (none) 2)

## Summary
- 26 nodes · 25 edges · 5 communities (4 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `ba3b5c4b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- IssueBuddy
- server.js
- dependencies
- scripts

## God Nodes (most connected - your core abstractions)
1. `IssueBuddy` - 5 edges
2. `scripts` - 2 edges
3. `dotenv` - 2 edges
4. `express` - 2 edges
5. `main` - 1 edges
6. `test` - 1 edges
7. `keywords` - 1 edges
8. `author` - 1 edges
9. `license` - 1 edges
10. `dotenv` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (5 total, 1 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.22
Nodes (8): author, description, keywords, license, main, name, type, version

### Community 1 - "IssueBuddy"
Cohesion: 0.33
Nodes (5): Dependencies, How to run, IssueBuddy, License, Model

### Community 2 - "server.js"
Cohesion: 0.33
Nodes (5): dotenv, express, app, dotenv, express

### Community 3 - "dependencies"
Cohesion: 0.67
Nodes (3): dependencies, dotenv, express

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `dotenv` connect `server.js` to `package.json`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **Why does `express` connect `server.js` to `package.json`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._