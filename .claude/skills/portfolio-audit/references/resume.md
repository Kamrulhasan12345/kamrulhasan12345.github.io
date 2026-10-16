# Résumé rules

Source of truth: `~/Personal/resumes/resume_master.yaml`. The submittable file is `~/Personal/resumes/kamrul_hasan_resume_1page.tex`. Tailored versions only select and trim from the YAML.

## Shape (student / internship)
1. 1 page. Sections in this order: header, Education, Experience, Projects, Publication, Skills.
2. No summary or objective. No job title unless the owner gives a target role (claims.md §Job families).
3. Header: name, email, phone (private PDF only), city, GitHub, LinkedIn, site. Plain text, no icons.
4. Each role or project: 1–5 bullets following the rewrite formula. Put the strongest first. Bold the searchable tech keywords sparingly.
5. Dates in one format (`Mon YYYY – Mon YYYY`); expected graduation shown.

## ATS-safe output
- No icon fonts, columns, tables, text in images, headers or footers.
- No ligatures: under XeTeX/tectonic use `Ligatures=NoCommon`; under pdfLaTeX use `microtype` `\DisableLigatures` + `glyphtounicode`.
- Verify the extracted text, not the visual: `pdftotext file.pdf - | grep -E 'ﬁ|ﬂ|ﬀ|ﬃ|ﬄ'` must print nothing, and the keywords must appear as plain words.

## Build
- Private PDF: `tectonic -o ~/Personal/resumes ~/Personal/resumes/kamrul_hasan_resume_1page.tex` (pdfLaTeX/Overleaf also works).
- Web PDF: `bash scripts/web-resume.sh` strips the phone number, fails unless the result is 1 page, and writes `public/resume.pdf`.
- `tectonic` isn't installed system-wide. Download the static binary into the job's temp dir, then run with `TECTONIC=<path>`.

## Recruiter read (do it last)
Read the PDF top to bottom as P1 for 10 seconds, then as P2 for 60 seconds. Write down what each would remember. If it isn't the 2–3 strongest verified results, reorder.
