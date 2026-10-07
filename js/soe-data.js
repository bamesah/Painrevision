// SOE mock exam content — long case, short clinical questions (SCQs) and clinical
// science questions for the examiner section (examiner.html).
//
// Generated from the branded pack source HTML in soe-packs/*.html (the
// "official" PainRevision exam packs) — do not hand-edit the question content
// here; edit the source pack HTML and regenerate instead, so this file and the
// printed/PDF packs never drift apart.
//
// Each question's "knowledgeHtml" is raw HTML (tables/flow-diagrams/images as
// authored in the pack) rendered as-is in the viewer (reference) pages only —
// the marking page intentionally shows just the checklist, to keep live
// scoring fast. See pack.css classes (kt, flow, st, ar, know, rh, hi, num) for
// the styling these fragments expect; examiner.html ports a scoped subset of
// pack.css under ".pack-embed" so they render identically to the PDF packs.

window.SOE_DATA = {
  "courses": [
    {
      "key": "oct14-nov-soe",
      "name": "October 14 Course — November SOE",
      "mocks": [
        {
          "key": "mock1",
          "name": "Mock Exam 1",
          "stations": [
            {
              "key": "station1",
              "name": "Station 1",
              "subtitle": "Long case + short clinical questions",
              "bigTimerMinutes": 42,
              "examinerNotes": [
                "Ask the questions in order. If the candidate cannot reach the answer, move on to the next question.",
                "Score points whenever they come up. If the candidate covers a point from an earlier question later in the station, go back and tick it.",
                "Use spare time. If time is left at the end, return to unanswered questions or ask follow-ups on the same topic rather than leave a silence.",
                "Short clinical questions. If the candidate finishes one before 7 minutes, you may move on to the next.",
                "Marking checklist. Tick Yes if the candidate covered the point and No if they did not. The Key knowledge box under each checklist gives a model answer so you can recognise different phrasings; candidates do not need every detail to earn a Yes.",
                "Don't lead. If a candidate reaches an answer only after heavy prompting, do not score it."
              ],
              "parts": [
                {
                  "key": "longcase",
                  "label": "Long case",
                  "kind": "longcase",
                  "timerMinutes": 21,
                  "sections": [
                    {
                      "number": 1,
                      "title": "Assessment and diagnosis",
                      "firstIndex": 0,
                      "count": 7
                    },
                    {
                      "number": 2,
                      "title": "Pharmacological management",
                      "firstIndex": 7,
                      "count": 5
                    },
                    {
                      "number": 3,
                      "title": "Psychological, MDT and neuromodulation",
                      "firstIndex": 12,
                      "count": 6
                    }
                  ],
                  "candidateInstructions": [
                    "You have 10 minutes to read this case history.",
                    "You may make notes on the paper provided, and take your notes and this sheet into the examination.",
                    "You will then have a 21-minute discussion of this case with two examiners, followed by 21 minutes for three short clinical questions."
                  ],
                  "caseHistoryHtml": "<p>A 56-year-old man attends the chronic pain clinic with his wife.</p>\n    <p>Eighteen months ago he was involved in a multi-vehicle road traffic collision while riding his motorcycle. He was trapped under a car, and extrication took about 4 hours.</p>\n    <p>His injuries included a crush injury to the right lower limb, multi-level right-sided rib fractures with a haemopneumothorax, and multiple facial and back soft-tissue injuries.</p>\n    <p>He was intubated and ventilated in intensive care for respiratory compromise and returned to theatre several times for debridement and washout of the right lower limb. This ended in a right above-knee amputation. He was discharged after a prolonged hospital stay.</p>\n    <p>Since discharge he has had constant, severe burning and electric-shock-like pain in the stump that shoots into the missing limb. He also has episodes in which his missing leg feels as if it is being crushed, severe enough to stop him sleeping. He finds his prosthesis very painful to wear and has chosen not to use it; he mobilises with crutches and a wheelchair.</p>\n    <p>Since the accident he has had recurrent seizure-like episodes leading to several hospital admissions. Neurology investigated and diagnosed non-epileptic seizures.</p>\n    <p>He also reports pain across his lower back since the accident.</p>\n    <p>He takes amlodipine for hypertension, and co-codamol and pregabalin regularly for pain.</p>\n    <p>He is married with three children aged 9, 13 and 16. He owned a construction company but has been unable to run it because of intrusive, recurrent flashbacks of the collision and a fear of driving to clients and building sites. He has had to declare bankruptcy. He has not driven since the accident.</p>\n    <p>He was told the collision was caused by a driver under the influence of drugs. That driver was imprisoned but was released 2 months ago. He is very angry and says the driver has \"ruined his life\". A personal injury claim against the other driver's insurer is ongoing.</p>\n    <p>His wife says he has become very angry, with outbursts at the children over minor things. He has started drinking several cans of beer every night. He sleeps 3 to 4 hours a night and has nightmares.</p>",
                  "questions": [
                    {
                      "number": "1.1",
                      "prompt": "Please summarise this case for us.",
                      "criteria": [
                        {
                          "text": "Gives an accurate summary of the presentation",
                          "strong": false
                        },
                        {
                          "text": "Recognises **neuropathic pain**",
                          "strong": false
                        },
                        {
                          "text": "Recognises both **phantom limb pain** and **stump (residual limb) pain**",
                          "strong": false
                        },
                        {
                          "text": "Comments on **central sensitisation**",
                          "strong": false
                        },
                        {
                          "text": "Mentions **functional neurological disorder**",
                          "strong": false
                        },
                        {
                          "text": "Mentions **nociplastic pain**",
                          "strong": false
                        },
                        {
                          "text": "Recognises likely **PTSD**",
                          "strong": false
                        },
                        {
                          "text": "Identifies significant **psychosocial factors**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:30%\">Problem</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Background</td><td>56-year-old man, 18 months after major polytrauma (motorcycle collision, 4-hour entrapment, ICU, multiple operations) ending in a right above-knee amputation</td></tr>\n        <tr><td class=\"rh\">Neuropathic pain</td><td>Burning, electric-shock stump pain, and phantom limb pain with crushing episodes that disturb sleep</td></tr>\n        <tr><td class=\"rh\">Low back pain</td><td>Since the accident. Possible nociceptive or nociplastic (sensitisation) component; needs examination</td></tr>\n        <tr><td class=\"rh\">Functional neurological disorder</td><td>Non-epileptic (dissociative) seizures diagnosed by neurology</td></tr>\n        <tr><td class=\"rh\">Prosthesis intolerance</td><td>A major barrier to rehabilitation and mobility</td></tr>\n        <tr><td class=\"rh\">Mental health</td><td>Probable PTSD (flashbacks, nightmares, avoidance of driving), possible low mood, anger and irritability</td></tr>\n        <tr><td class=\"rh\">Social</td><td>Nightly drinking, poor sleep, loss of business and bankruptcy, perceived injustice, ongoing litigation, strain on the family</td></tr>\n        <tr><td class=\"rh\">Medication</td><td>Co-codamol and pregabalin are ineffective, and combining them with alcohol is a safety concern</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.2",
                      "prompt": "What types of pain does this man have?",
                      "criteria": [
                        {
                          "text": "Identifies **neuropathic pain** (stump and phantom limb pain)",
                          "strong": false
                        },
                        {
                          "text": "Considers **nociplastic pain** for the low back pain",
                          "strong": false
                        },
                        {
                          "text": "Considers a **nociceptive** contribution",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:22%\">Mechanism</th><th style=\"width:34%\">Where in this patient</th><th>Supporting features</th></tr>\n        <tr><td class=\"rh\">Neuropathic</td><td>Stump pain and phantom limb pain</td><td>Lesion of peripheral nerves at the amputation site; burning, shooting, electric-shock quality</td></tr>\n        <tr><td class=\"rh\">Nociplastic</td><td>Possibly the low back pain</td><td>Hypersensitivity on examination without a structural cause; poor sleep, distress</td></tr>\n        <tr><td class=\"rh\">Nociceptive</td><td>Back, chest wall, stump</td><td>Rib fractures, back soft-tissue injury, socket pressure on the stump</td></tr>\n      </table>\n      <p class=\"note\">These mechanisms often coexist; a candidate who says so should be credited.</p>"
                    },
                    {
                      "number": "1.3",
                      "prompt": "Define nociplastic pain. How would you decide whether a patient has it?",
                      "criteria": [
                        {
                          "text": "Can define nociplastic pain",
                          "strong": false
                        },
                        {
                          "text": "Knows the IASP clinical criteria and the **possible / probable** grading",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>IASP definition (2017):</b> pain that arises from altered nociception, despite no clear evidence of actual or threatened tissue damage activating peripheral nociceptors, and no evidence of disease or lesion of the somatosensory system causing the pain.</p>\n      <h5>IASP clinical criteria (Kosek et al., 2021)</h5>\n      <div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Entry criteria</span>Pain for more than <b>3 months</b>; regional, multifocal or widespread distribution; <b>not entirely explained</b> by nociceptive or neuropathic mechanisms</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Add</span><b>Clinical signs</b> of pain hypersensitivity in the painful area (dynamic mechanical allodynia, heat or cold allodynia, painful after-sensations)</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Grade</span><b>Possible</b> nociplastic pain</div>\n      </div>\n      <div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Possible, plus</span>A <b>history</b> of pain hypersensitivity in the painful area (to touch, pressure, movement, heat or cold)</div>\n        <div class=\"ar\">+</div>\n        <div class=\"st\"><span class=\"k\">And at least one</span>Sensitivity to sound, light or odours; sleep disturbance with frequent waking; fatigue; cognitive problems</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Grade</span><b>Probable</b> nociplastic pain</div>\n      </div>"
                    },
                    {
                      "number": "1.4",
                      "prompt": "How is chronic neuropathic pain classified in ICD-11? Where does this patient fit?",
                      "criteria": [
                        {
                          "text": "Knows ICD-11 divides chronic neuropathic pain into **peripheral** and **central**",
                          "strong": false
                        },
                        {
                          "text": "Gives examples of conditions in each category",
                          "strong": false
                        },
                        {
                          "text": "Places this patient's neuropathic pain appropriately",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:50%\">Chronic peripheral neuropathic pain</th><th>Chronic central neuropathic pain</th></tr>\n        <tr><td>Trigeminal neuralgia<br>Chronic neuropathic pain after peripheral nerve injury<br>Painful polyneuropathy<br>Post-herpetic neuralgia<br>Painful radiculopathy</td><td>After spinal cord injury<br>After brain injury<br>Post-stroke pain<br>Associated with multiple sclerosis</td></tr>\n      </table>\n      <p><b>This patient:</b> chronic peripheral neuropathic pain after peripheral nerve injury (stump and phantom limb pain). Phantom pain also has well-described central mechanisms (spinal and cortical), so an argument for features of both is acceptable if justified.</p>"
                    },
                    {
                      "number": "1.5",
                      "prompt": "How would you examine him, and what investigations would you request?",
                      "criteria": [
                        {
                          "text": "Describes a focused **stump examination**, including looking for a **neuroma**",
                          "strong": false
                        },
                        {
                          "text": "Describes a back examination",
                          "strong": false
                        },
                        {
                          "text": "Requests appropriate **bloods** to exclude other causes of neuropathy",
                          "strong": false
                        },
                        {
                          "text": "Suggests **stump imaging** (ultrasound and/or X-ray)",
                          "strong": false
                        },
                        {
                          "text": "Considers **prosthetist / socket review**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Area</th><th>What to look for or request</th></tr>\n        <tr><td class=\"rh\">Stump</td><td>Skin and wound healing, pressure areas from the socket, palpation and <b>Tinel's sign</b> for a neuroma, sensory mapping (allodynia, hyperalgesia, numbness), temperature and colour</td></tr>\n        <tr><td class=\"rh\">Back and general</td><td>Spinal examination, tenderness, areas of allodynia; neurological examination of the upper limbs and left lower limb</td></tr>\n        <tr><td class=\"rh\">Bloods</td><td>FBC, U&amp;E (renal function for pregabalin dosing), LFTs, GGT and MCV (alcohol), HbA1c, B12, folate, TFTs</td></tr>\n        <tr><td class=\"rh\">Stump imaging</td><td>Ultrasound for neuroma; plain X-ray for heterotopic ossification or bone spur</td></tr>\n        <tr><td class=\"rh\">Prosthetics</td><td>Prosthetist or limb fitting centre review of socket fit</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.6",
                      "prompt": "What mechanisms explain phantom limb pain?",
                      "criteria": [
                        {
                          "text": "Describes **peripheral** mechanisms",
                          "strong": false
                        },
                        {
                          "text": "Describes **spinal** mechanisms",
                          "strong": false
                        },
                        {
                          "text": "Describes **cortical reorganisation**",
                          "strong": false
                        },
                        {
                          "text": "Recognises the contribution of **psychological factors**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:20%\">Level</th><th>Mechanism</th></tr>\n        <tr><td class=\"rh\">Peripheral</td><td><b>Neuroma</b> with ectopic discharge (upregulated sodium channels such as Nav1.3, Nav1.7, Nav1.8), mechanosensitivity, ephaptic transmission, sympathetic–sensory coupling</td></tr>\n        <tr><td class=\"rh\">Dorsal root ganglion</td><td>Ectopic firing; sympathetic sprouting around DRG cell bodies</td></tr>\n        <tr><td class=\"rh\">Spinal</td><td><b>Central sensitisation</b> (NMDA receptor activation, wind-up), loss of inhibitory GABA and glycine interneurones, microglial activation, deafferentation with Aβ-fibre sprouting into superficial laminae</td></tr>\n        <tr><td class=\"rh\">Supraspinal</td><td><b>Cortical reorganisation</b> of somatosensory and motor cortex: neighbouring areas (such as the face) invade the deafferented limb area, and the degree of reorganisation correlates with pain intensity. Mismatch between motor intention and absent sensory and visual feedback</td></tr>\n        <tr><td class=\"rh\">Psychological</td><td>Stress, anxiety and PTSD amplify phantom pain. Pain before amputation is a risk factor (\"pain memory\")</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.7",
                      "prompt": "What is the current understanding of the pathophysiology of functional neurological disorder?",
                      "criteria": [
                        {
                          "text": "Describes FND as a disorder of brain **function** rather than structure",
                          "strong": false
                        },
                        {
                          "text": "Describes at least one proposed mechanism (abnormal attention or prediction, altered sense of agency, limbic–motor connectivity)",
                          "strong": false
                        },
                        {
                          "text": "Recognises predisposing factors",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p>A disorder of brain <b>function</b> rather than structure (\"software, not hardware\"). Diagnosis is <b>positive</b>, based on typical clinical features, not made by exclusion.</p>\n      <h5>Proposed mechanisms</h5>\n      <ul>\n        <li><b>Abnormal attention</b> and symptom monitoring: excessive focus on bodily sensations disrupts automatic control of movement</li>\n        <li><b>Abnormal prediction:</b> expectations about movement or sensation override normal motor output and sensory input</li>\n        <li><b>Abnormal threat processing:</b> bodily sensations are amplified when interpreted as dangerous</li>\n        <li><b>Altered sense of agency:</b> reduced activity in the right temporoparietal junction, so movements feel involuntary</li>\n        <li><b>Increased limbic–motor connectivity</b> (amygdala, cingulate, insula): emotional arousal influences motor control</li>\n        <li>Overlap with central sensitisation, fatigue, sleep disturbance and cognitive symptoms</li>\n      </ul>\n      <table class=\"kt\">\n        <tr><th style=\"width:24%\">Factor</th><th>Examples (relevant to this patient)</th></tr>\n        <tr><td class=\"rh\">Predisposing</td><td>Previous trauma, PTSD, other functional disorders</td></tr>\n        <tr><td class=\"rh\">Precipitating</td><td>Physical injury, panic, dissociation</td></tr>\n        <tr><td class=\"rh\">Perpetuating</td><td>Illness beliefs, avoidance, deconditioning, ongoing stress</td></tr>\n      </table>"
                    },
                    {
                      "number": "2.1",
                      "prompt": "Outline your overall approach to managing this man.",
                      "criteria": [
                        {
                          "text": "Describes a **biopsychosocial**, MDT-based approach",
                          "strong": false
                        },
                        {
                          "text": "Covers biological, psychological and social elements",
                          "strong": false
                        },
                        {
                          "text": "Involves the patient in **shared goal setting**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:33%\">Biological</th><th style=\"width:34%\">Psychological</th><th>Social</th></tr>\n        <tr><td>Rationalise medication; optimise anti-neuropathic agent; topical treatments; stump and prosthesis review; interventions</td><td>PTSD treatment; mood, anger and alcohol; pain-focused psychology (ACT or CBT); pain management programme</td><td>Finances, work, family support, driving, litigation</td></tr>\n      </table>\n      <p class=\"note\"><b>Examiner note:</b> keep this brief; the next questions explore each area.</p>"
                    },
                    {
                      "number": "2.2",
                      "prompt": "He is already taking pregabalin. How would you optimise his anti-neuropathic medication?",
                      "criteria": [
                        {
                          "text": "Checks pregabalin **dose, adherence and side effects** before changing treatment",
                          "strong": false
                        },
                        {
                          "text": "Considers switching to another first-line agent",
                          "strong": false
                        },
                        {
                          "text": "Chooses an agent based on his comorbidities (alcohol, mood, overdose risk)",
                          "strong": false
                        },
                        {
                          "text": "Considers **combination therapy**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Is this an adequate trial?</b> Review dose, titration, adherence and side effects. An adequate trial is the maximum tolerated dose (up to 600 mg/day with normal renal function) for at least 2 to 4 weeks.</p>\n      <p><b>NICE CG173:</b> choose from amitriptyline, duloxetine, gabapentin or pregabalin. If the first is ineffective or not tolerated, switch to one of the remaining three.</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:18%\">Agent</th><th style=\"width:38%\">In his favour</th><th>Concerns in him</th></tr>\n        <tr><td class=\"rh\">Pregabalin</td><td>Already established</td><td>Schedule 3 controlled drug with misuse potential; MHRA warning of respiratory depression with opioids and alcohol (he takes co-codamol and drinks nightly)</td></tr>\n        <tr><td class=\"rh\">Amitriptyline</td><td>Helps sleep; lowest NNT</td><td>Dangerous in overdose; sedating with alcohol; anticholinergic</td></tr>\n        <tr><td class=\"rh\">Duloxetine</td><td>May help mood and anxiety</td><td>Avoid with heavy alcohol use or hepatic impairment</td></tr>\n      </table>\n      <p><b>Combination therapy:</b> adding an antidepressant to a gabapentinoid (or the reverse) when monotherapy gives only a partial response. In OPTION-DM (2022) the three first-line pathways worked about equally well, and combination therapy helped people with a poor response to monotherapy.</p>\n      <p><b>Switching:</b> taper pregabalin over at least 1 week and cross-taper to the new agent; review at 2 to 4 weeks.</p>"
                    },
                    {
                      "number": "2.3",
                      "prompt": "Is any one agent more efficacious than the others?",
                      "criteria": [
                        {
                          "text": "Identifies **TCAs** as having the **lowest NNT**",
                          "strong": false
                        },
                        {
                          "text": "Knows the approximate NNTs of SNRIs and gabapentinoids",
                          "strong": false
                        },
                        {
                          "text": "Is aware of the NNH for these agents",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:34%\">Drug class</th><th style=\"width:22%\">NNT (50% relief)</th><th>NNH (withdrawal due to adverse effects)</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Tricyclic antidepressants</td><td class=\"num\"><b>3.6</b></td><td class=\"num\">13.4</td></tr>\n        <tr><td class=\"rh\">SNRIs (duloxetine)</td><td class=\"num\">6.4</td><td class=\"num\">11.8</td></tr>\n        <tr><td class=\"rh\">Gabapentin</td><td class=\"num\">6.3</td><td class=\"num\">25.6</td></tr>\n        <tr><td class=\"rh\">Pregabalin</td><td class=\"num\">7.7</td><td class=\"num\">13.9</td></tr>\n      </table>\n      <p class=\"note\">Finnerup et al., Lancet Neurology 2015 (NeuPSIG meta-analysis). <b>Examiner note:</b> the aim is for the candidate to say amitriptyline (a TCA) has the lowest NNT. Credit approximate figures.</p>"
                    },
                    {
                      "number": "2.4",
                      "prompt": "Are there any topical agents you would consider?",
                      "criteria": [
                        {
                          "text": "Suggests **capsaicin** (8% patch or cream)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:26%\">Agent</th><th>Notes</th></tr>\n        <tr><td class=\"rh\">Capsaicin 8% patch (Qutenza)</td><td>Licensed for peripheral neuropathic pain in adults. Skin must be intact. Specialist use: NICE CG173 advises against starting it in non-specialist settings</td></tr>\n        <tr><td class=\"rh\">Capsaicin 0.075% cream</td><td>Licensed for post-herpetic neuralgia and painful diabetic neuropathy. NICE CG173: consider for localised neuropathic pain if the person wishes to avoid oral treatment</td></tr>\n        <tr><td class=\"rh\">Lidocaine 5% plaster</td><td>Licensed only for post-herpetic neuralgia (off-label here). Useful for localised allodynia, but may be impractical under a prosthetic socket</td></tr>\n      </table>"
                    },
                    {
                      "number": "2.5",
                      "prompt": "Would you consider opioids for him?",
                      "criteria": [
                        {
                          "text": "Recognises **limited long-term benefit** and the harms of opioids",
                          "strong": false
                        },
                        {
                          "text": "Knows the NICE CG173 position on **tramadol**",
                          "strong": false
                        },
                        {
                          "text": "Knows the **Opioids Aware** dose threshold",
                          "strong": false
                        },
                        {
                          "text": "Recognises his specific risk factors (alcohol, pregabalin, mood)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Limited long-term benefit</b> in chronic non-cancer pain. Harms include dependence, opioid-induced hyperalgesia, hypogonadism, falls and overdose</li>\n        <li><b>NICE CG173:</b> tramadol only as acute rescue therapy, not for long-term use</li>\n        <li><b>Opioids Aware (FPM):</b> threshold of <b>90 mg/day oral morphine equivalent</b>, with an ideal target of <b>50 mg/day</b>. If a patient is still in pain on opioids, the opioid is not working and should be reduced and stopped</li>\n        <li><b>His risks:</b> nightly alcohol, pregabalin co-prescription and mood or PTSD increase the risk of sedation, respiratory depression and misuse. Tramadol also lowers the seizure threshold</li>\n        <li>Review the benefit of his existing co-codamol and consider tapering it</li>\n      </ul>"
                    },
                    {
                      "number": "3.1",
                      "prompt": "How would you address his psychological needs?",
                      "criteria": [
                        {
                          "text": "Refers for **PTSD** assessment and treatment",
                          "strong": false
                        },
                        {
                          "text": "Mentions referral for **EMDR**",
                          "strong": false
                        },
                        {
                          "text": "Offers pain-focused psychology (such as **ACT** or CBT)",
                          "strong": false
                        },
                        {
                          "text": "Addresses his **anger**",
                          "strong": false
                        },
                        {
                          "text": "Addresses his **alcohol** use",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:22%\">Need</th><th>Approach</th></tr>\n        <tr><td class=\"rh\">PTSD</td><td>Refer for assessment and treatment (trauma psychology service or community mental health team), managing depression and risk alongside. <b>NICE NG116:</b> offer <b>trauma-focused CBT</b>; offer <b>EMDR</b> to adults presenting more than 3 months after a non-combat trauma, which applies to him</td></tr>\n        <tr><td class=\"rh\">Pain</td><td>Pain-focused psychology: ACT or CBT; pain management programme once PTSD treatment is under way</td></tr>\n        <tr><td class=\"rh\">Anger</td><td>Psychoeducation, CBT-based anger management, identifying triggers, family involvement</td></tr>\n        <tr><td class=\"rh\">Alcohol</td><td>Screen (AUDIT), brief intervention, referral to alcohol services. Assess dependence before advising abrupt cessation (withdrawal and seizure risk); thiamine if dependent</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.2",
                      "prompt": "What is ACT, and what are its core processes?",
                      "criteria": [
                        {
                          "text": "Explains the aim of ACT",
                          "strong": false
                        },
                        {
                          "text": "Names at least **two** of the six core processes",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Acceptance and Commitment Therapy</b> is a \"third-wave\" behavioural therapy. It aims to increase <b>psychological flexibility</b>: living a values-based life while pain and distress are present, rather than trying to control or eliminate them. Unlike traditional CBT, it does not try to change the content of thoughts.</p>\n      <figure class=\"dg\">\n        <svg viewBox=\"0 0 520 252\" width=\"440\" role=\"img\" aria-label=\"ACT hexaflex: six core processes around psychological flexibility\">\n          <g stroke=\"#E0D3C4\" stroke-width=\"1.5\" fill=\"none\">\n            <polygon points=\"260,26 381,76 381,176 260,226 139,176 139,76\"/>\n            <line x1=\"260\" y1=\"26\" x2=\"260\" y2=\"226\"/><line x1=\"139\" y1=\"76\" x2=\"381\" y2=\"176\"/><line x1=\"381\" y1=\"76\" x2=\"139\" y2=\"176\"/>\n          </g>\n          <g font-family=\"'Plus Jakarta Sans',sans-serif\" font-size=\"12.5\" font-weight=\"700\" text-anchor=\"middle\">\n            <rect x=\"190\" y=\"104\" width=\"140\" height=\"44\" rx=\"22\" fill=\"#241B16\"/>\n            <text x=\"260\" y=\"122\" fill=\"#F5A524\" font-size=\"9\" font-family=\"'IBM Plex Mono',monospace\" letter-spacing=\"1\">CENTRE</text>\n            <text x=\"260\" y=\"138\" fill=\"#fff\" font-size=\"11.5\">Psychological flexibility</text>\n            <rect x=\"196\" y=\"10\" width=\"128\" height=\"32\" rx=\"16\" fill=\"#fff\" stroke=\"#F0623C\" stroke-width=\"1.5\"/><text x=\"260\" y=\"31\" fill=\"#241B16\">Present moment</text>\n            <rect x=\"317\" y=\"60\" width=\"128\" height=\"32\" rx=\"16\" fill=\"#fff\" stroke=\"#F0623C\" stroke-width=\"1.5\"/><text x=\"381\" y=\"81\" fill=\"#241B16\">Values</text>\n            <rect x=\"317\" y=\"160\" width=\"128\" height=\"32\" rx=\"16\" fill=\"#fff\" stroke=\"#F0623C\" stroke-width=\"1.5\"/><text x=\"381\" y=\"181\" fill=\"#241B16\">Committed action</text>\n            <rect x=\"196\" y=\"210\" width=\"128\" height=\"32\" rx=\"16\" fill=\"#fff\" stroke=\"#F0623C\" stroke-width=\"1.5\"/><text x=\"260\" y=\"231\" fill=\"#241B16\">Self-as-context</text>\n            <rect x=\"75\" y=\"160\" width=\"128\" height=\"32\" rx=\"16\" fill=\"#fff\" stroke=\"#F0623C\" stroke-width=\"1.5\"/><text x=\"139\" y=\"181\" fill=\"#241B16\">Cognitive defusion</text>\n            <rect x=\"75\" y=\"60\" width=\"128\" height=\"32\" rx=\"16\" fill=\"#fff\" stroke=\"#F0623C\" stroke-width=\"1.5\"/><text x=\"139\" y=\"81\" fill=\"#241B16\">Acceptance</text>\n          </g>\n          <g font-family=\"'IBM Plex Mono',monospace\" font-size=\"9\" fill=\"#7C7068\" letter-spacing=\"1\">\n            <text x=\"20\" y=\"130\">OPEN</text><text x=\"468\" y=\"130\">ENGAGED</text>\n          </g>\n        </svg>\n        <figcaption>The ACT \"hexaflex\". Acceptance and defusion keep the person open; values and committed action keep them engaged; present moment and self-as-context keep them centred.</figcaption>\n      </figure>\n      <table class=\"kt\">\n        <tr><th style=\"width:26%\">Process</th><th>In plain terms</th></tr>\n        <tr><td class=\"rh\">Acceptance</td><td>Making room for pain and distress instead of struggling against them</td></tr>\n        <tr><td class=\"rh\">Cognitive defusion</td><td>Seeing thoughts as thoughts, not facts (\"I'm having the thought that…\")</td></tr>\n        <tr><td class=\"rh\">Present moment</td><td>Mindful attention to the here and now</td></tr>\n        <tr><td class=\"rh\">Self-as-context</td><td>A stable sense of self that observes experiences without being defined by them</td></tr>\n        <tr><td class=\"rh\">Values</td><td>Clarifying what matters to the person (family, work, roles)</td></tr>\n        <tr><td class=\"rh\">Committed action</td><td>Taking steps towards those values, even with pain present</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.3",
                      "prompt": "What would physiotherapy offer him?",
                      "criteria": [
                        {
                          "text": "Suggests **mirror therapy** and explains the technique",
                          "strong": false
                        },
                        {
                          "text": "Describes **graded motor imagery**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Mirror therapy:</b> a mirror shows the reflection of the intact limb moving in place of the missing limb. This is thought to reduce the motor–sensory mismatch and reverse cortical reorganisation.</p>\n      <h5>Graded motor imagery: three stages, in order</h5>\n      <div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">1 · Laterality recognition</span>Look at pictures of limbs and decide quickly whether each is left or right</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">2 · Explicit motor imagery</span>Eyes closed, vividly imagine moving the painful or missing limb without moving it</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">3 · Mirror therapy</span>Watch the reflection of the healthy limb acting as the missing limb</div>\n      </div>\n      <p><b>Also:</b> a stump desensitisation programme for allodynia (graded textures, tapping, massage), gait and prosthetic training, and graded activity.</p>"
                    },
                    {
                      "number": "3.4",
                      "prompt": "Which other professionals and services would you involve?",
                      "criteria": [
                        {
                          "text": "Involves **occupational therapy**",
                          "strong": false
                        },
                        {
                          "text": "Involves the **prosthetist / limb fitting centre**",
                          "strong": false
                        },
                        {
                          "text": "Involves **social and welfare support**",
                          "strong": false
                        },
                        {
                          "text": "Involves the neurology **FND service**",
                          "strong": false
                        },
                        {
                          "text": "Involves the GP, pharmacist or employment support",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:30%\">Professional or service</th><th>Role for him</th></tr>\n        <tr><td class=\"rh\">Occupational therapy</td><td>Home adaptations, activities of daily living, vocational rehabilitation</td></tr>\n        <tr><td class=\"rh\">Prosthetist / limb fitting centre</td><td>Socket review and prosthetic rehabilitation</td></tr>\n        <tr><td class=\"rh\">Social worker / welfare advice</td><td>Benefits (such as Universal Credit and Personal Independence Payment), debt and bankruptcy advice, carer support for his wife</td></tr>\n        <tr><td class=\"rh\">Neurology FND service</td><td>Specialist FND therapy (physiotherapy and psychology)</td></tr>\n        <tr><td class=\"rh\">GP, pharmacist, employment support</td><td>Continuity and single prescriber; medication review; Access to Work</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.5",
                      "prompt": "What neuromodulation options would be available for him?",
                      "criteria": [
                        {
                          "text": "Knows the **NICE TA159** criteria for spinal cord stimulation",
                          "strong": false
                        },
                        {
                          "text": "Mentions **DRG stimulation** for focal pain",
                          "strong": false
                        },
                        {
                          "text": "Recognises that he is **not currently suitable** for neuromodulation",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>SCS (NICE TA159):</b> chronic neuropathic pain of at least 50 mm on a 0 to 100 mm VAS, for at least 6 months despite appropriate conventional medical management, after assessment by an experienced MDT and a successful trial of stimulation</li>\n        <li><b>DRG stimulation:</b> may suit focal pain such as stump pain</li>\n        <li>An online <b>e-health referral tool</b> developed by European consensus can help identify suitable SCS candidates</li>\n        <li><b>Not suitable now:</b> untreated PTSD, depression with possible suicidal ideation, harmful drinking, unresolved prosthesis problems and ongoing litigation are relative contraindications, or at least reasons to delay</li>\n      </ul>"
                    },
                    {
                      "number": "3.6",
                      "prompt": "Are there any central neuromodulation techniques for pain with a central component? What is the evidence?",
                      "criteria": [
                        {
                          "text": "Mentions **transcranial magnetic stimulation** and/or **motor cortex stimulation**",
                          "strong": false
                        },
                        {
                          "text": "Mentions **deep brain stimulation**",
                          "strong": false
                        },
                        {
                          "text": "Recognises the **limited evidence** for these therapies",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:26%\">Technique</th><th>Evidence</th></tr>\n        <tr><td class=\"rh\">Repetitive TMS</td><td>High-frequency rTMS of the primary motor cortex opposite the pain has the strongest evidence (level A for neuropathic pain in European evidence-based guidelines). The effect is short-lived and needs repeated sessions</td></tr>\n        <tr><td class=\"rh\">Motor cortex stimulation</td><td>Implanted epidural electrodes. Very limited evidence</td></tr>\n        <tr><td class=\"rh\">Deep brain stimulation</td><td>Targets: periaqueductal and periventricular grey, sensory thalamus, anterior cingulate. Evidence is mainly case series, including phantom limb pain. NICE interventional procedures guidance (IPG381) requires patient selection by a specialist MDT</td></tr>\n      </table>"
                    }
                  ]
                },
                {
                  "key": "scq1",
                  "label": "Short clinical Q1",
                  "kind": "scq",
                  "timerMinutes": 7,
                  "subtitle": "TRPV1, sensitisation and capsaicin",
                  "questions": [
                    {
                      "number": "1.1",
                      "prompt": "What is the TRPV1 receptor?",
                      "criteria": [
                        {
                          "text": "Recalls the name of the receptor and its ion permeability",
                          "strong": false
                        },
                        {
                          "text": "Identifies ligands that activate it",
                          "strong": false
                        },
                        {
                          "text": "Knows where it is expressed",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:22%\">Feature</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Name and structure</td><td><b>Transient receptor potential vanilloid 1.</b> A non-selective cation channel (highly permeable to Ca²⁺, also Na⁺); a tetramer, each subunit with six transmembrane domains</td></tr>\n        <tr><td class=\"rh\">Activators</td><td>Noxious heat (above about 43 °C), capsaicin, protons (pH below about 6), endocannabinoids (anandamide), resiniferatoxin</td></tr>\n        <tr><td class=\"rh\">Expression</td><td>Mainly C fibres and some Aδ nociceptors, at both peripheral and central (dorsal horn) terminals; also in the DRG and brain</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.2",
                      "prompt": "What is peripheral sensitisation, and how is TRPV1 involved?",
                      "criteria": [
                        {
                          "text": "Defines peripheral sensitisation",
                          "strong": false
                        },
                        {
                          "text": "Explains the physiology of peripheral sensitisation",
                          "strong": false
                        },
                        {
                          "text": "Explains the role of TRPV1",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Definition (IASP):</b> increased responsiveness and reduced threshold of nociceptive neurones in the periphery to stimulation of their receptive fields, after tissue injury or inflammation. It produces <b>primary hyperalgesia</b> at the site of injury.</p>\n      <div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Inflammatory soup</span>Bradykinin, PGE2, NGF, histamine, serotonin, cytokines, H⁺</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Kinases</span>Protein kinase A (PGE2) and protein kinase C (bradykinin) phosphorylate channels such as TRPV1 and Nav1.8</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Result</span>Lower activation threshold and more firing: <b>primary hyperalgesia</b></div>\n      </div>\n      <h5>Role of TRPV1</h5>\n      <ul>\n        <li>Phosphorylation lowers the TRPV1 heat threshold from about 43 °C towards body temperature, so warmth becomes painful (<b>heat hyperalgesia</b>)</li>\n        <li><b>NGF</b> acting at TrkA increases TRPV1 trafficking to the membrane, and its retrograde transport to the DRG increases TRPV1 expression</li>\n        <li>Protons in inflamed, acidic tissue activate TRPV1 directly</li>\n      </ul>\n      <h5>Other features</h5>\n      <ul>\n        <li>Recruitment of <b>silent nociceptors</b></li>\n        <li><b>Neurogenic inflammation:</b> substance P and CGRP released from nociceptor terminals spread the response</li>\n      </ul>"
                    },
                    {
                      "number": "1.3",
                      "prompt": "How does capsaicin produce analgesia?",
                      "criteria": [
                        {
                          "text": "Recognises it as a **TRPV1 agonist**",
                          "strong": false
                        },
                        {
                          "text": "Explains **defunctionalisation**",
                          "strong": false
                        },
                        {
                          "text": "Mentions **substance P depletion**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Activation</span>TRPV1 agonist: burning pain, erythema and neurogenic inflammation</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Defunctionalisation</span>Sustained activation causes Ca²⁺ overload, mitochondrial dysfunction and cytoskeletal disruption; epidermal nerve fibres retract</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Recovery</span>Reversible as fibres regrow over weeks to months, so repeat treatment is needed</div>\n      </div>\n      <p><b>Substance P depletion</b> is the main mechanism proposed for low-strength creams.</p>"
                    },
                    {
                      "number": "1.4",
                      "prompt": "What formulations of capsaicin are available?",
                      "criteria": [
                        {
                          "text": "Knows the different formulations (low-strength cream, high-strength patch)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:28%\">Formulation</th><th style=\"width:36%\">Licensed use (UK)</th><th>How used</th></tr>\n        <tr><td class=\"rh\">0.025% cream</td><td>Osteoarthritis</td><td>Applied 3 to 4 times a day</td></tr>\n        <tr><td class=\"rh\">0.075% cream</td><td>Post-herpetic neuralgia; painful diabetic neuropathy</td><td>Applied 3 to 4 times a day</td></tr>\n        <tr><td class=\"rh\">8% patch (Qutenza, 179 mg)</td><td>Peripheral neuropathic pain in adults</td><td>Single application in hospital; can be repeated every 90 days if effective</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.5",
                      "prompt": "How is the 8% patch applied, and how often can it be repeated?",
                      "criteria": [
                        {
                          "text": "Knows it must be applied in a **hospital setting**",
                          "strong": false
                        },
                        {
                          "text": "Knows it can be **repeated**, the interval, and that repeat use depends on response",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Prepare</span>Trained professional wearing nitrile gloves; mark the painful area; topical local anaesthetic if needed (especially if allodynic)</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Apply</span><b>30 min</b> on the feet, <b>60 min</b> elsewhere; up to <b>4 patches</b> at once</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Remove</span>Clean with cleansing gel; cooling and short-acting analgesia for post-application pain</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Repeat</span>Every <b>90 days</b> if there was a meaningful response and pain has returned</div>\n      </div>\n      <p>Monitor blood pressure during treatment, as pain can raise it.</p>"
                    },
                    {
                      "number": "1.6",
                      "prompt": "What is the evidence for its efficacy?",
                      "criteria": [
                        {
                          "text": "Knows its approximate **NNT**",
                          "strong": false
                        },
                        {
                          "text": "Knows the strength of the evidence",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Capsaicin 8%: NNT about 11</b> for 50% pain relief (Finnerup 2015). NeuPSIG recommends it as <b>second line</b> for peripheral neuropathic pain</li>\n        <li><b>Cochrane (high-concentration capsaicin):</b> a small proportion more patients than control get meaningful relief in post-herpetic neuralgia, HIV neuropathy and painful diabetic neuropathy. Evidence quality is moderate to low</li>\n        <li><b>Low-strength creams:</b> insufficient evidence for neuropathic pain</li>\n        <li>NNH is not meaningful for systemic effects, because adverse effects are mainly local</li>\n      </ul>"
                    },
                    {
                      "number": "1.7",
                      "prompt": "What are the adverse effects and contraindications?",
                      "criteria": [
                        {
                          "text": "Describes adverse effects",
                          "strong": false
                        },
                        {
                          "text": "Describes contraindications",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\"></th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Adverse effects</td><td>Application-site pain, burning, erythema, pruritus, papules, oedema; transient rise in blood pressure; cough, sneezing or throat irritation if inhaled; rarely burns or reduced sensation</td></tr>\n        <tr><td class=\"rh\">Contraindication</td><td>Hypersensitivity to capsaicin or excipients</td></tr>\n        <tr><td class=\"rh\">Do not apply to</td><td>Face, scalp, near the eyes or mucous membranes, or broken or inflamed skin</td></tr>\n        <tr><td class=\"rh\">Caution</td><td>Uncontrolled hypertension or a recent cardiovascular event; reduced sensation in the feet (such as diabetes), so inspect the skin</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.8",
                      "prompt": "Are there any other drugs that act on TRP channels?",
                      "criteria": [
                        {
                          "text": "Mentions the **TRPM8** receptor (cold) and **menthol** as its ligand",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:18%\">Channel</th><th style=\"width:30%\">Natural activator</th><th>Drug or compound</th></tr>\n        <tr><td class=\"rh\">TRPV1</td><td>Noxious heat, protons</td><td>Capsaicin, resiniferatoxin (agonists)</td></tr>\n        <tr><td class=\"rh\">TRPM8</td><td>Cool to cold (below about 25 °C)</td><td><b>Menthol</b>, used topically for its cooling, counter-irritant analgesia</td></tr>\n        <tr><td class=\"rh\">TRPA1</td><td>Noxious cold, irritants</td><td>Mustard oil, cinnamaldehyde; a target for new analgesics</td></tr>\n      </table>"
                    }
                  ]
                },
                {
                  "key": "scq2",
                  "label": "Short clinical Q2",
                  "kind": "scq",
                  "timerMinutes": 7,
                  "subtitle": "Lumbar medial branch (anatomy and clinical)",
                  "questions": [
                    {
                      "number": "2.1",
                      "prompt": "Describe the course of a lumbar medial branch.",
                      "criteria": [
                        {
                          "text": "Describes the anatomy of the medial branch in detail",
                          "strong": false
                        },
                        {
                          "text": "Knows that **L5** is different (the dorsal ramus itself is targeted)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<figure class=\"dg\">\n        <svg viewBox=\"0 0 640 226\" width=\"100%\" role=\"img\" aria-label=\"Branching of a lumbar spinal nerve into rami and branches\">\n          <g font-family=\"'Plus Jakarta Sans',sans-serif\" text-anchor=\"middle\">\n            <g stroke=\"#7C7068\" stroke-width=\"1.6\" fill=\"none\">\n              <path d=\"M320 46 V62 H130 V80\"/><path d=\"M320 62 H455 V80\"/>\n              <path d=\"M455 122 V136 H300 V152\"/><path d=\"M455 136 H460 V152\"/><path d=\"M455 136 H580 V152\"/>\n            </g>\n            <rect x=\"215\" y=\"4\" width=\"210\" height=\"42\" rx=\"9\" fill=\"#241B16\"/><text x=\"320\" y=\"23\" fill=\"#fff\" font-size=\"13\" font-weight=\"700\">Spinal nerve</text><text x=\"320\" y=\"38\" fill=\"#F5A524\" font-size=\"10\">exits the intervertebral foramen</text>\n            <rect x=\"25\" y=\"80\" width=\"210\" height=\"42\" rx=\"9\" fill=\"#fff\" stroke=\"#E0D3C4\" stroke-width=\"1.5\"/><text x=\"130\" y=\"99\" fill=\"#241B16\" font-size=\"12.5\" font-weight=\"700\">Ventral ramus</text><text x=\"130\" y=\"114\" fill=\"#7C7068\" font-size=\"10\">lumbar plexus, lower limb</text>\n            <rect x=\"350\" y=\"80\" width=\"210\" height=\"42\" rx=\"9\" fill=\"#fff\" stroke=\"#E0D3C4\" stroke-width=\"1.5\"/><text x=\"455\" y=\"99\" fill=\"#241B16\" font-size=\"12.5\" font-weight=\"700\">Dorsal ramus</text><text x=\"455\" y=\"114\" fill=\"#7C7068\" font-size=\"10\">passes back over the TP</text>\n            <rect x=\"200\" y=\"152\" width=\"200\" height=\"70\" rx=\"9\" fill=\"#FFF4EF\" stroke=\"#F0623C\" stroke-width=\"2\"/><text x=\"300\" y=\"171\" fill=\"#D2491F\" font-size=\"12.5\" font-weight=\"700\">Medial branch</text><text x=\"300\" y=\"186\" fill=\"#3A2D25\" font-size=\"10\">facet joints (two levels)</text><text x=\"300\" y=\"200\" fill=\"#3A2D25\" font-size=\"10\">multifidus, interspinales</text><text x=\"300\" y=\"214\" fill=\"#3A2D25\" font-size=\"10\">interspinous ligament, periosteum</text>\n            <rect x=\"410\" y=\"152\" width=\"100\" height=\"70\" rx=\"9\" fill=\"#fff\" stroke=\"#E0D3C4\" stroke-width=\"1.5\"/><text x=\"460\" y=\"181\" fill=\"#241B16\" font-size=\"12\" font-weight=\"700\">Intermediate</text><text x=\"460\" y=\"197\" fill=\"#7C7068\" font-size=\"10\">longissimus</text>\n            <rect x=\"520\" y=\"152\" width=\"118\" height=\"70\" rx=\"9\" fill=\"#fff\" stroke=\"#E0D3C4\" stroke-width=\"1.5\"/><text x=\"579\" y=\"174\" fill=\"#241B16\" font-size=\"12\" font-weight=\"700\">Lateral</text><text x=\"579\" y=\"190\" fill=\"#7C7068\" font-size=\"10\">iliocostalis, skin</text><text x=\"579\" y=\"204\" fill=\"#7C7068\" font-size=\"10\">(L1–3: cluneal nn.)</text>\n          </g>\n        </svg>\n        <figcaption>Branches of a lumbar spinal nerve. The medial branch is the target for diagnostic blocks and RF denervation.</figcaption>\n      </figure>\n      <ul>\n        <li>The spinal nerve exits the intervertebral foramen and divides into a <b>ventral ramus</b> and a <b>dorsal ramus</b></li>\n        <li>The dorsal ramus divides into <b>medial, intermediate and lateral branches</b>; the medial branch is the most medial</li>\n        <li>The medial branch crosses the upper border of the <b>transverse process of the vertebra below</b>, in the groove at its junction with the <b>superior articular process</b> (so the L4 medial branch lies on the L5 transverse process). It passes under the <b>mamillo-accessory ligament</b>, then divides to supply the facet joints and multifidus</li>\n        <li><b>L5 is different:</b> the <b>L5 dorsal ramus</b> itself is targeted where it crosses the <b>sacral ala</b>, in the groove at the junction with the S1 superior articular process</li>\n      </ul>"
                    },
                    {
                      "number": "2.2",
                      "prompt": "What does it supply in the lumbar region?",
                      "criteria": [
                        {
                          "text": "Knows each facet joint has **dual innervation** from two medial branches",
                          "strong": false
                        },
                        {
                          "text": "Knows the muscular supply of the medial branch",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Facet (zygapophyseal) joints:</b> each joint is supplied by the medial branch at its own level and the level above.</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:18%\">Joint</th><th style=\"width:34%\">Nerves to block</th><th>Needle targets</th></tr>\n        <tr><td class=\"rh\">L3/4</td><td>L2 and L3 medial branches</td><td>L3 and L4 transverse process–SAP junctions</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">L4/5</td><td>L3 and L4 medial branches</td><td>L4 and L5 transverse process–SAP junctions</td></tr>\n        <tr><td class=\"rh\">L5/S1</td><td>L4 medial branch and L5 dorsal ramus</td><td>L5 transverse process–SAP junction; sacral ala–S1 SAP groove</td></tr>\n      </table>\n      <p><b>Also supplies:</b> multifidus, interspinales, the interspinous ligament and the periosteum of the neural arch. It does <b>not</b> supply the lumbar skin; lateral branches supply skin and iliocostalis.</p>"
                    },
                    {
                      "number": "2.3",
                      "prompt": "Which clinical features suggest facet-mediated low back pain?",
                      "criteria": [
                        {
                          "text": "Identifies relevant history and examination findings",
                          "strong": false
                        },
                        {
                          "text": "Recognises diagnostic blocks as the way to confirm the diagnosis",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>No history or examination finding reliably predicts facet joint pain</b>, which is why diagnostic blocks are used</li>\n        <li><b>Suggestive features:</b> axial pain, paraspinal tenderness, pain on extension and extension–rotation, somatic referral to the buttock and thigh above the knee, no radicular signs</li>\n        <li><b>Imaging correlates poorly:</b> facet degeneration is common in people without pain</li>\n      </ul>"
                    },
                    {
                      "number": "2.4",
                      "prompt": "What is the NICE guidance on interventional treatment for facet-mediated pain?",
                      "criteria": [
                        {
                          "text": "Knows RF denervation should follow a **positive diagnostic medial branch block**",
                          "strong": false
                        },
                        {
                          "text": "Knows the NICE criteria for RF denervation",
                          "strong": false
                        },
                        {
                          "text": "Discusses false-positive rates of single blocks, a second confirmatory block, and small injectate volumes (0.3 to 0.5 ml)",
                          "strong": true
                        }
                      ],
                      "knowledgeHtml": "<p><b>NICE NG59 (low back pain and sciatica):</b> do not offer spinal injections for low back pain. Consider RF denervation when <b>all</b> of these apply:</p>\n      <ul>\n        <li>Non-surgical treatment has not worked</li>\n        <li>The main source of pain is thought to be structures supplied by the medial branch nerve</li>\n        <li>Localised back pain is moderate or severe (<b>5 or more on a 10-point VAS</b>) at the time of referral</li>\n      </ul>\n      <p>Only perform RF denervation after a <b>positive response to a diagnostic medial branch block</b>.</p>\n      <p><b>Other NG59 advice:</b> offer exercise and combined physical and psychological programmes. Do not offer paracetamol alone, gabapentinoids, antidepressants or opioids for chronic low back pain.</p>"
                    },
                    {
                      "number": "2.5",
                      "prompt": "Describe the fluoroscopic anatomy for a lumbar medial branch block.",
                      "criteria": [
                        {
                          "text": "Describes the fluoroscopic anatomy accurately",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li>Patient prone. AP view with the <b>endplates squared</b> at the target level, then oblique about 15 to 20° to show the <b>\"Scotty dog\"</b></li>\n        <li><b>Target:</b> the junction of the superior articular process and the upper border of the transverse process, just below the \"eye\" (the pedicle) of the Scotty dog</li>\n        <li><b>L5 dorsal ramus:</b> the groove between the sacral ala and the S1 superior articular process</li>\n      </ul>"
                    },
                    {
                      "number": "2.6",
                      "prompt": "What is the technical difference when performing RF denervation?",
                      "criteria": [
                        {
                          "text": "Knows the RF cannula must lie **parallel to the nerve**",
                          "strong": false
                        },
                        {
                          "text": "Knows how to obtain the fluoroscopic view that achieves this",
                          "strong": false
                        },
                        {
                          "text": "Knows the lesion temperature and duration",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Why parallel:</b> the RF lesion forms radially around the active tip, with little extension beyond the tip, so the electrode must lie parallel to the nerve</li>\n        <li><b>Getting there:</b> tilt the C-arm caudally, with less oblique angulation than for a medial branch block, so the cannula travels caudal to cranial along the groove</li>\n        <li><b>Safety views:</b> view along the groove to confirm position, and a lateral view to make sure the tip is not near the foramen or nerve root</li>\n        <li><b>Testing:</b> larger-gauge cannula; sensory stimulation at 50 Hz (concordant below about 0.5 V) and motor stimulation at 2 Hz (multifidus twitch, no limb or root stimulation)</li>\n        <li><b>Lesioning:</b> local anaesthetic first; lesion at about <b>80 to 90 °C for 60 to 90 seconds</b>; often two lesions per nerve</li>\n      </ul>"
                    },
                    {
                      "number": "2.7",
                      "prompt": "What are the complications and contraindications?",
                      "criteria": [
                        {
                          "text": "Describes complications of the procedure",
                          "strong": false
                        },
                        {
                          "text": "Describes contraindications to the procedure",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:22%\"></th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Complications</td><td>Pain flare, post-procedure neuritis or dysaesthesia, bleeding, infection, vasovagal episode, skin burn at the dispersive pad, nerve root injury if too anterior, dural puncture, contrast or local anaesthetic reactions, radiation exposure</td></tr>\n        <tr><td class=\"rh\">Contraindications</td><td>Patient refusal, local or systemic infection, coagulopathy (RF carries more risk than a simple block), pregnancy, allergy, inability to lie prone. Pacemaker or ICD needs cardiology advice (relative)</td></tr>\n      </table>"
                    },
                    {
                      "number": "2.8",
                      "prompt": "Apart from RF denervation, what other options target the medial branch or facet joint pain?",
                      "criteria": [
                        {
                          "text": "Lists other interventions for facet joint pain",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Cryoneurolysis;</b> chemical neurolysis (phenol, alcohol); pulsed RF (weak evidence); endoscopic rhizotomy</li>\n        <li><b>Restorative neurostimulation:</b> implanted stimulation of the medial branch to activate multifidus (such as ReActiv8) for low back pain with multifidus dysfunction</li>\n        <li><b>Intra-articular facet injection</b> (not recommended by NICE)</li>\n      </ul>"
                    },
                    {
                      "number": "2.9",
                      "prompt": "How long does the benefit of RF denervation last, and why?",
                      "criteria": [
                        {
                          "text": "Knows that **nerve regeneration** limits the benefit to months or years",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li>Typically <b>6 to 18 months</b>, sometimes longer. Pain returns as the <b>nerve regenerates</b>: the lesion is axonotmetic, leaving the endoneurial tube intact</li>\n        <li>The procedure can be repeated if the first gave meaningful, lasting relief</li>\n      </ul>"
                    }
                  ]
                },
                {
                  "key": "scq3",
                  "label": "Short clinical Q3",
                  "kind": "scq",
                  "timerMinutes": 7,
                  "subtitle": "Traumatic peripheral nerve injury",
                  "questions": [
                    {
                      "number": "3.1",
                      "prompt": "How are peripheral nerve injuries classified?",
                      "criteria": [
                        {
                          "text": "Knows the **Seddon** classification and its classes",
                          "strong": false
                        },
                        {
                          "text": "Knows the **Sunderland** classification",
                          "strong": false
                        },
                        {
                          "text": "Understands the differences between grades of nerve injury",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:17%\">Seddon</th><th style=\"width:13%\">Sunderland</th><th style=\"width:38%\">What is damaged</th><th>Recovery</th></tr>\n        <tr><td class=\"rh\">Neurapraxia</td><td class=\"num\">1</td><td>Myelin only; local conduction block. Nerve in continuity</td><td>Full, over days to weeks</td></tr>\n        <tr><td class=\"rh\" rowspan=\"3\">Axonotmesis</td><td class=\"num\">2</td><td>Axon disrupted; endoneurium intact. Wallerian degeneration</td><td>Full, regrowing about 1 mm/day</td></tr>\n        <tr><td class=\"num\">3</td><td>Axon and endoneurium disrupted; perineurium intact</td><td>Incomplete (misdirected regrowth)</td></tr>\n        <tr><td class=\"num\">4</td><td>Perineurium disrupted; only epineurium intact (<b>neuroma in continuity</b>)</td><td>Poor; needs surgery</td></tr>\n        <tr><td class=\"rh\">Neurotmesis</td><td class=\"num\">5</td><td>Complete transection</td><td>None without surgical repair</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.2",
                      "prompt": "What happens to the nerve after axonal injury, and how does it regenerate?",
                      "criteria": [
                        {
                          "text": "Describes the pathophysiology after nerve injury",
                          "strong": false
                        },
                        {
                          "text": "Explains **Wallerian degeneration**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Hours to days</span><b>Wallerian degeneration:</b> the axon distal to the injury, separated from its cell body, breaks down in an active, regulated process</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Days to weeks</span>Schwann cells and macrophages clear debris; Schwann cells form <b>bands of Büngner</b> that guide sprouts from the proximal stump</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Regrowth</span>About <b>1 mm/day</b> (an inch a month)</div>\n      </div>\n      <ul>\n        <li>Motor end-plates degenerate if not reinnervated within about <b>12 to 18 months</b></li>\n        <li>If sprouts cannot reach the distal stump, they form a disorganised <b>neuroma</b></li>\n      </ul>"
                    },
                    {
                      "number": "3.3",
                      "prompt": "What are the mechanisms of pain after nerve injury?",
                      "criteria": [
                        {
                          "text": "Describes **peripheral** mechanisms",
                          "strong": false
                        },
                        {
                          "text": "Describes **central** mechanisms",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:18%\">Level</th><th>Mechanism</th></tr>\n        <tr><td class=\"rh\">Peripheral</td><td>Ectopic discharge from the <b>neuroma</b> (upregulated Nav1.3, 1.7 and 1.8; reduced K⁺ channels), mechanosensitivity, <b>ephaptic transmission</b>, inflammatory mediators</td></tr>\n        <tr><td class=\"rh\">Spinal</td><td>Central sensitisation (NMDA receptors, wind-up), loss of GABAergic and glycinergic inhibition, <b>microglial activation</b> (BDNF, P2X4), Aβ-fibre and sympathetic sprouting</td></tr>\n        <tr><td class=\"rh\">Supraspinal</td><td>Reduced descending inhibition and increased descending facilitation; cortical reorganisation</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.4",
                      "prompt": "How would you distinguish neuropathic pain after nerve injury from CRPS type 2?",
                      "criteria": [
                        {
                          "text": "Mentions the **Budapest criteria** for diagnosing CRPS",
                          "strong": false
                        },
                        {
                          "text": "Explains how the clinical picture differs between CRPS type 2 and neuropathic pain after nerve injury",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:50%\">Neuropathic pain after nerve injury</th><th>CRPS type 2</th></tr>\n        <tr><td>Pain and sensory change stay within the <b>nerve's territory</b>. No significant autonomic or trophic change</td><td>Follows a confirmed nerve injury, but signs <b>spread beyond the nerve territory</b>, with autonomic, oedema and trophic features</td></tr>\n      </table>\n      <p><b>Budapest criteria:</b> continuing pain disproportionate to the inciting event; at least one <b>symptom</b> in 3 of 4 categories and at least one <b>sign</b> in 2 of 4 categories; no other diagnosis better explains them.</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:26%\">Category</th><th>Examples</th></tr>\n        <tr><td class=\"rh\">Sensory</td><td>Hyperalgesia, allodynia</td></tr>\n        <tr><td class=\"rh\">Vasomotor</td><td>Temperature asymmetry, skin colour change or asymmetry</td></tr>\n        <tr><td class=\"rh\">Sudomotor / oedema</td><td>Oedema, sweating change or asymmetry</td></tr>\n        <tr><td class=\"rh\">Motor / trophic</td><td>Reduced range of motion, weakness, tremor, dystonia; hair, nail or skin changes</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.5",
                      "prompt": "How would you investigate?",
                      "criteria": [
                        {
                          "text": "Suggests appropriate investigations after nerve injury",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:28%\">Investigation</th><th>What it adds</th></tr>\n        <tr><td class=\"rh\">Clinical</td><td>History, sensory mapping, motor examination. An <b>advancing Tinel's sign</b> suggests regeneration</td></tr>\n        <tr><td class=\"rh\">Quantitative sensory testing</td><td>Profiles sensory loss and gain</td></tr>\n        <tr><td class=\"rh\">Nerve conduction studies and EMG</td><td>Most informative after 10 to 14 days (once Wallerian degeneration has occurred); denervation potentials appear after about 3 weeks</td></tr>\n        <tr><td class=\"rh\">High-resolution ultrasound</td><td>Nerve continuity, neuroma, entrapment; allows a guided diagnostic block</td></tr>\n        <tr><td class=\"rh\">MR neurography</td><td>Nerve continuity and signal change, especially for proximal injuries</td></tr>\n        <tr><td class=\"rh\">Skin biopsy</td><td>Reduced intra-epidermal nerve fibre density</td></tr>\n        <tr><td class=\"rh\">Diagnostic nerve block</td><td>Localises the pain generator</td></tr>\n        <tr><td class=\"rh\">Other imaging</td><td>Fracture, haematoma or scar tissue causing entrapment</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.6",
                      "prompt": "When should a nerve injury be referred for a surgical opinion?",
                      "criteria": [
                        {
                          "text": "Recognises the indications for surgery",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:28%\">Type of injury</th><th>Timing of surgical opinion</th></tr>\n        <tr><td class=\"rh\">Open, sharp, with a deficit</td><td>Early exploration and <b>primary repair</b>, ideally within days</td></tr>\n        <tr><td class=\"rh\">Open, blunt or contaminated</td><td>Delayed repair after a few weeks, once the extent of damage is clear</td></tr>\n        <tr><td class=\"rh\">Closed</td><td>Serial examination and nerve conduction studies at about <b>3 weeks and 3 months</b>; refer if there is no clinical or electrical recovery by about <b>3 months</b></td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Any injury, promptly</td><td>Neuroma pain, an expanding deficit, or severe neuropathic pain</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.7",
                      "prompt": "What non-invasive and minimally invasive treatments are available?",
                      "criteria": [
                        {
                          "text": "Recognises non-invasive options",
                          "strong": false
                        },
                        {
                          "text": "Recognises minimally invasive options",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\"></th><th>Options</th></tr>\n        <tr><td class=\"rh\">Non-invasive</td><td>Anti-neuropathic drugs; TENS; topicals (lidocaine 5% plaster, capsaicin 8% patch); desensitisation</td></tr>\n        <tr><td class=\"rh\">Minimally invasive</td><td><b>Perineural local anaesthetic</b> with or without steroid.<br><b>Botulinum toxin A:</b> third line in NeuPSIG recommendations, supported by small RCTs in focal neuropathic pain; thought to inhibit peripheral release of substance P, CGRP and glutamate.<br><b>Hydrodissection with 5% dextrose:</b> evidence mainly from carpal tunnel RCTs; mechanical release, plus a proposed effect on neurogenic inflammation</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.8",
                      "prompt": "Which ablative or neuromodulation interventions can be used?",
                      "criteria": [
                        {
                          "text": "Recognises the role of **ablative** interventions",
                          "strong": false
                        },
                        {
                          "text": "Recognises the role of **neuromodulation**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Intervention</th><th>Notes</th></tr>\n        <tr><td class=\"rh\">Pulsed RF</td><td>Electric field with tip temperature kept below 42 °C, so non-destructive; proposed modulation of pain signalling (c-Fos, microglia). Modest evidence</td></tr>\n        <tr><td class=\"rh\">Cryoneurolysis</td><td>Probe cooled to about −70 °C (nitrous oxide). Causes a cold-induced axonotmesis, so the nerve regenerates along intact endoneurial tubes without neuroma formation</td></tr>\n        <tr><td class=\"rh\">Neuromodulation</td><td>Peripheral nerve stimulation; DRG stimulation (focal pain, such as groin or foot); spinal cord stimulation</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.9",
                      "prompt": "What factors predict a poor outcome after nerve injury?",
                      "criteria": [
                        {
                          "text": "Mentions appropriate risk factors for a poor outcome",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Domain</th><th>Factors</th></tr>\n        <tr><td class=\"rh\">Injury</td><td>Older age, proximal injury (long distance to the target), higher Sunderland grade, delayed repair, crush or avulsion, associated vascular injury, smoking, diabetes</td></tr>\n        <tr><td class=\"rh\">Psychological</td><td>Catastrophising, PTSD, low self-efficacy</td></tr>\n        <tr><td class=\"rh\">Social</td><td>Litigation, loss of work and poor social support are linked with persistent pain and disability</td></tr>\n      </table>"
                    }
                  ]
                }
              ]
            },
            {
              "key": "station2",
              "name": "Station 2",
              "subtitle": "Clinical Science",
              "bigTimerMinutes": 30,
              "examinerNotes": [
                "Ask the sub-questions in order. If the candidate cannot reach the answer, move on to the next sub-question.",
                "Score points whenever they come up. If the candidate covers a point from an earlier sub-question later on, go back and tick it.",
                "Keep to time. Move to the next question at about 7.5 minutes. If the candidate finishes early, you may move on.",
                "Use spare time. If time is left at the end, return to unanswered sub-questions or ask follow-ups on the same topic rather than leave a silence.",
                "Marking checklist. Tick Yes if the candidate covered the point and No if they did not. The Key knowledge box under each checklist gives a model answer so you can recognise different phrasings; candidates do not need every detail to earn a Yes.",
                "Don't lead. If a candidate reaches an answer only after heavy prompting, do not score it."
              ],
              "parts": [
                {
                  "key": "q1",
                  "label": "Question 1",
                  "kind": "clinsci",
                  "timerMinutes": 7.5,
                  "subtitle": "Anatomy — Lumbar plexus and the ilioinguinal and iliohypogastric nerves",
                  "questions": [
                    {
                      "number": "1.1",
                      "prompt": "Describe the origin and branches of the lumbar plexus.",
                      "criteria": [
                        {
                          "text": "States the plexus is formed from the **anterior rami of L1–L4** (often with a contribution from T12)",
                          "strong": false
                        },
                        {
                          "text": "Knows the plexus forms **within psoas major**",
                          "strong": false
                        },
                        {
                          "text": "Names the main branches",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p>Formed from the <b>anterior (ventral) rami of L1–L4</b>, often with a contribution from T12 (subcostal nerve). It forms <b>within the substance of psoas major</b>, anterior to the lumbar transverse processes.</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:24%\">Branch</th><th style=\"width:14%\">Roots</th><th style=\"width:22%\">Leaves psoas</th><th>Main supply</th></tr>\n        <tr><td class=\"rh\">Iliohypogastric</td><td class=\"num\">T12–L1</td><td>Lateral border</td><td>Suprapubic and upper lateral buttock skin; internal oblique, transversus abdominis</td></tr>\n        <tr><td class=\"rh\">Ilioinguinal</td><td class=\"num\">L1</td><td>Lateral border</td><td>Upper medial thigh, root of penis and anterior scrotum (or mons pubis and labium majus)</td></tr>\n        <tr><td class=\"rh\">Genitofemoral</td><td class=\"num\">L1–L2</td><td><b>Anterior surface</b></td><td>Genital branch: cremaster, scrotal or labial skin. Femoral branch: skin over the femoral triangle</td></tr>\n        <tr><td class=\"rh\">Lateral femoral cutaneous</td><td class=\"num\">L2–L3</td><td>Lateral border</td><td>Skin of the lateral thigh</td></tr>\n        <tr><td class=\"rh\">Femoral</td><td class=\"num\">L2–L4</td><td>Lateral border</td><td>Posterior divisions. Quadriceps, iliacus, sartorius, pectineus; anterior thigh and (via saphenous) medial leg skin</td></tr>\n        <tr><td class=\"rh\">Obturator</td><td class=\"num\">L2–L4</td><td><b>Medial border</b></td><td>Anterior divisions. Adductors; skin of the medial thigh</td></tr>\n        <tr><td class=\"rh\">Lumbosacral trunk</td><td class=\"num\">L4–L5</td><td>Medial border</td><td>Joins the sacral plexus</td></tr>\n      </table>\n      <p class=\"note\">An inconstant accessory obturator nerve (L3–L4) is present in some people.</p>"
                    },
                    {
                      "number": "1.2",
                      "prompt": "Describe the course and innervation of the ilioinguinal and iliohypogastric nerves.",
                      "criteria": [
                        {
                          "text": "Describes the course between **transversus abdominis and internal oblique** near the ASIS",
                          "strong": false
                        },
                        {
                          "text": "Describes the sensory supply of the **iliohypogastric** nerve",
                          "strong": false
                        },
                        {
                          "text": "Describes the sensory supply of the **ilioinguinal** nerve",
                          "strong": false
                        },
                        {
                          "text": "Knows the motor supply to **internal oblique and transversus abdominis**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Shared course:</b> both emerge from the lateral border of psoas, cross anterior to quadratus lumborum behind the kidney, then pierce transversus abdominis near the iliac crest to run in the <b>plane between transversus abdominis and internal oblique</b>.</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:18%\"></th><th style=\"width:41%\">Iliohypogastric</th><th>Ilioinguinal</th></tr>\n        <tr><td class=\"rh\">Course</td><td>Pierces internal oblique about 2 cm medial to the ASIS, then the external oblique aponeurosis above the superficial inguinal ring</td><td>Pierces internal oblique and enters the inguinal canal (not through the deep ring), running with the spermatic cord or round ligament and leaving through the superficial ring</td></tr>\n        <tr><td class=\"rh\">Sensory</td><td>Anterior cutaneous branch: suprapubic skin. Lateral cutaneous branch: upper lateral buttock</td><td>Upper medial thigh, root of the penis and anterior scrotum, or mons pubis and labium majus</td></tr>\n        <tr><td class=\"rh\">Motor</td><td colspan=\"2\">Lowest fibres of internal oblique and transversus abdominis (including the conjoint tendon), which help protect the inguinal canal</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.3",
                      "prompt": "What are the causes and clinical features of ilioinguinal or iliohypogastric neuralgia?",
                      "criteria": [
                        {
                          "text": "Recognises common **causes** (such as inguinal hernia repair, Pfannenstiel incision)",
                          "strong": false
                        },
                        {
                          "text": "Describes neuropathic pain in the **groin radiating to the scrotum or labium and inner thigh**",
                          "strong": false
                        },
                        {
                          "text": "Describes aggravating and relieving factors (hip extension, walking, coughing; hip flexion)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:22%\"></th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Causes</td><td>Entrapment or injury after <b>inguinal hernia repair</b> (mesh, sutures, fixation), <b>Pfannenstiel incision</b> or caesarean section, appendicectomy, laparoscopic port sites, iliac crest bone graft harvest, trauma, pregnancy</td></tr>\n        <tr><td class=\"rh\">Symptoms</td><td>Burning, shooting or lancinating pain in the lower abdomen and groin, radiating to the scrotum or labium and upper inner thigh</td></tr>\n        <tr><td class=\"rh\">Aggravating / relieving</td><td>Worse with hip extension, walking, standing and raised intra-abdominal pressure (coughing). Eased by hip flexion, so patients may walk stooped</td></tr>\n        <tr><td class=\"rh\">Examination</td><td>Tenderness or Tinel's sign medial and inferior to the ASIS; hypoaesthesia, hyperalgesia or allodynia in the nerve distribution. Relief from a diagnostic ultrasound-guided block supports the diagnosis</td></tr>\n        <tr><td class=\"rh\">Differentials</td><td>Genitofemoral neuralgia, recurrent hernia, hip pathology, L1 radiculopathy, obturator neuralgia, pubic or adductor pathology</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.4",
                      "prompt": "Which other nerve can cause similar groin pain, and how would you tell them apart?",
                      "criteria": [
                        {
                          "text": "Names the **genitofemoral nerve** (L1–L2)",
                          "strong": false
                        },
                        {
                          "text": "Explains how the two can be distinguished (distribution, selective blocks)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Genitofemoral nerve (L1–L2)</b> pierces the anterior surface of psoas and divides into a <b>genital branch</b> (through the deep ring and inguinal canal: cremaster, scrotal or labial skin) and a <b>femoral branch</b> (under the inguinal ligament: skin over the femoral triangle)</li>\n        <li><b>Overlapping territories</b> make clinical distinction difficult. The genital branch runs inside the inguinal canal, so pain after hernia repair may involve all three nerves</li>\n        <li><b>Selective ultrasound-guided diagnostic blocks</b> help identify the source: ilioinguinal/iliohypogastric near the ASIS, or the genital branch in the inguinal canal near the spermatic cord. An L1–L2 paravertebral block covers all three</li>\n      </ul>"
                    },
                    {
                      "number": "1.5",
                      "prompt": "How would you perform an ultrasound-guided block of these two nerves?",
                      "criteria": [
                        {
                          "text": "Describes patient position and probe placement just **superomedial to the ASIS**",
                          "strong": false
                        },
                        {
                          "text": "Identifies the **three muscle layers** of the abdominal wall",
                          "strong": false
                        },
                        {
                          "text": "Deposits injectate in the plane between **internal oblique and transversus abdominis**",
                          "strong": false
                        },
                        {
                          "text": "Mentions the **deep circumflex iliac artery**, colour Doppler and aspiration",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<figure class=\"dg\">\n        <svg viewBox=\"0 0 640 236\" width=\"100%\" role=\"img\" aria-label=\"Ultrasound view for ilioinguinal and iliohypogastric block\">\n          <defs>\n            <linearGradient id=\"shadow\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#3A2D25\" stop-opacity=\".55\"/><stop offset=\"1\" stop-color=\"#3A2D25\" stop-opacity=\".85\"/></linearGradient>\n          </defs>\n          <rect x=\"0\" y=\"0\" width=\"470\" height=\"236\" rx=\"10\" fill=\"#4A3F38\"/>\n          <!-- layers -->\n          <rect x=\"0\" y=\"14\" width=\"470\" height=\"20\" fill=\"#8C8079\"/>\n          <path d=\"M0 34 H470 V64 H0Z\" fill=\"#6E625B\"/>\n          <path d=\"M0 64 H470 V104 H0Z\" fill=\"#5E534C\"/>\n          <path d=\"M0 108 H470 V140 H0Z\" fill=\"#5E534C\"/>\n          <line x1=\"0\" y1=\"64\" x2=\"470\" y2=\"64\" stroke=\"#D9CCBF\" stroke-width=\"1.5\"/>\n          <line x1=\"0\" y1=\"105\" x2=\"470\" y2=\"105\" stroke=\"#F5E9DC\" stroke-width=\"2.5\"/>\n          <line x1=\"0\" y1=\"141\" x2=\"470\" y2=\"141\" stroke=\"#D9CCBF\" stroke-width=\"1.5\"/>\n          <path d=\"M0 150 C120 145 300 158 470 150\" stroke=\"#EFE6DC\" stroke-width=\"2\" fill=\"none\"/>\n          <!-- ASIS + shadow -->\n          <path d=\"M0 40 C40 28 80 40 92 70 L92 236 L0 236Z\" fill=\"url(#shadow)\"/>\n          <path d=\"M0 40 C40 28 80 40 92 70\" stroke=\"#FFFFFF\" stroke-width=\"4\" fill=\"none\"/>\n          <!-- nerves + artery -->\n          <ellipse cx=\"140\" cy=\"106\" rx=\"10\" ry=\"6\" fill=\"#1E1713\" stroke=\"#F5A524\" stroke-width=\"2\"/>\n          <ellipse cx=\"170\" cy=\"106\" rx=\"10\" ry=\"6\" fill=\"#1E1713\" stroke=\"#F5A524\" stroke-width=\"2\"/>\n          <circle cx=\"200\" cy=\"112\" r=\"6\" fill=\"#D2491F\"/>\n          <!-- needle (in-plane, medial to lateral) -->\n          <line x1=\"468\" y1=\"16\" x2=\"186\" y2=\"104\" stroke=\"#FFFFFF\" stroke-width=\"2.5\"/>\n          <!-- probe -->\n          <rect x=\"0\" y=\"0\" width=\"470\" height=\"12\" rx=\"4\" fill=\"#241B16\"/>\n          <g font-family=\"'Plus Jakarta Sans',sans-serif\" font-size=\"10.5\" fill=\"#fff\">\n            <text x=\"10\" y=\"226\" font-weight=\"700\">ASIS + acoustic shadow</text>\n            <text x=\"300\" y=\"226\" font-family=\"'IBM Plex Mono',monospace\" font-size=\"9\" fill=\"#D9CCBF\">LATERAL ← → MEDIAL</text>\n          </g>\n          <!-- right-hand labels -->\n          <g font-family=\"'Plus Jakarta Sans',sans-serif\" font-size=\"11.5\">\n            <line x1=\"470\" y1=\"24\" x2=\"486\" y2=\"24\" stroke=\"#A99E95\"/><text x=\"490\" y=\"28\" fill=\"#7C7068\">Skin, subcutaneous fat</text>\n            <line x1=\"470\" y1=\"49\" x2=\"486\" y2=\"49\" stroke=\"#A99E95\"/><text x=\"490\" y=\"53\" fill=\"#241B16\" font-weight=\"700\">External oblique</text>\n            <line x1=\"470\" y1=\"84\" x2=\"486\" y2=\"84\" stroke=\"#A99E95\"/><text x=\"490\" y=\"88\" fill=\"#241B16\" font-weight=\"700\">Internal oblique</text>\n            <line x1=\"470\" y1=\"105\" x2=\"486\" y2=\"105\" stroke=\"#F0623C\" stroke-width=\"1.5\"/><text x=\"490\" y=\"109\" fill=\"#D2491F\" font-weight=\"700\">Target plane</text>\n            <line x1=\"470\" y1=\"124\" x2=\"486\" y2=\"124\" stroke=\"#A99E95\"/><text x=\"490\" y=\"128\" fill=\"#241B16\" font-weight=\"700\">Transversus abdominis</text>\n            <line x1=\"470\" y1=\"150\" x2=\"486\" y2=\"150\" stroke=\"#A99E95\"/><text x=\"490\" y=\"154\" fill=\"#7C7068\">Peritoneum, bowel</text>\n          </g>\n          <g font-family=\"'Plus Jakarta Sans',sans-serif\" font-size=\"10.5\">\n            <circle cx=\"496\" cy=\"186\" r=\"6\" fill=\"#1E1713\" stroke=\"#F5A524\" stroke-width=\"2\"/><text x=\"508\" y=\"190\" fill=\"#3A2D25\">II and IH nerves</text>\n            <circle cx=\"496\" cy=\"206\" r=\"6\" fill=\"#D2491F\"/><text x=\"508\" y=\"210\" fill=\"#3A2D25\">Deep circumflex iliac a.</text>\n            <line x1=\"488\" y1=\"226\" x2=\"504\" y2=\"226\" stroke=\"#7C7068\" stroke-width=\"2.5\"/><text x=\"508\" y=\"230\" fill=\"#3A2D25\">In-plane needle</text>\n          </g>\n        </svg>\n        <figcaption>Schematic ultrasound view with the probe just superomedial to the ASIS, along the line towards the umbilicus.</figcaption>\n      </figure>\n      <ul>\n        <li><b>Set-up:</b> supine, aseptic technique, high-frequency linear probe just superomedial to the ASIS, orientated obliquely along a line from the ASIS towards the umbilicus</li>\n        <li><b>Scan:</b> identify the acoustic shadow of the ASIS laterally, then external oblique (or its aponeurosis), internal oblique and transversus abdominis</li>\n        <li><b>Target:</b> two small hypoechoic ovals in the fascial plane between internal oblique and transversus abdominis, close to the iliac crest, often next to the <b>deep circumflex iliac artery</b> (confirm with colour Doppler)</li>\n        <li><b>Injection:</b> in-plane approach; aspirate, then inject in small increments to hydrodissect the plane. About <b>3 to 5 ml</b> for a diagnostic block, up to about <b>10 ml</b> of local anaesthetic with or without steroid for a therapeutic block</li>\n      </ul>"
                    },
                    {
                      "number": "1.6",
                      "prompt": "What are the complications of this block?",
                      "criteria": [
                        {
                          "text": "Mentions transient **femoral nerve block** (quadriceps weakness, falls risk)",
                          "strong": false
                        },
                        {
                          "text": "Mentions **peritoneal or bowel puncture**",
                          "strong": false
                        },
                        {
                          "text": "Mentions general risks (bleeding, infection, local anaesthetic toxicity, nerve injury, failure)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:26%\">Complication</th><th>Detail</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Femoral nerve block</td><td>Local anaesthetic spreads deep to transversus abdominis along the fascia iliaca, causing quadriceps weakness and falls risk. Warn the patient, especially for day cases</td></tr>\n        <tr><td class=\"rh\">Too deep</td><td>Peritoneal puncture and bowel perforation</td></tr>\n        <tr><td class=\"rh\">General</td><td>Vascular puncture and haematoma (deep circumflex iliac artery), infection, local anaesthetic systemic toxicity, nerve injury, block failure, pain flare, steroid side effects</td></tr>\n        <tr><td class=\"rh\">Landmark technique</td><td>Higher failure and complication rates than ultrasound guidance, because the nerves' position relative to the ASIS varies considerably</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.7",
                      "prompt": "If blocks give only short-term relief, what longer-term interventional and neuromodulation options are there?",
                      "criteria": [
                        {
                          "text": "Mentions **peripheral nerve stimulation**",
                          "strong": false
                        },
                        {
                          "text": "Mentions **DRG stimulation** for focal neuropathic groin pain",
                          "strong": false
                        },
                        {
                          "text": "Mentions **SCS** for neuropathic pain",
                          "strong": false
                        },
                        {
                          "text": "Mentions ablative or surgical options (pulsed RF, cryoneurolysis, neurectomy)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:26%\">Option</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Pulsed RF or cryoneurolysis</td><td>Cryoneurolysis preserves the nerve sheath, so the nerve regenerates without neuroma. Conventional RF ablation carries a risk of neuritis</td></tr>\n        <tr><td class=\"rh\">Surgical neurectomy</td><td>Such as triple neurectomy (ilioinguinal, iliohypogastric and genital branch of genitofemoral) for post-herniorrhaphy pain, sometimes with mesh removal</td></tr>\n        <tr><td class=\"rh\">Peripheral nerve stimulation</td><td>Ultrasound-guided percutaneous lead placed alongside the nerves</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">DRG stimulation</td><td>At <b>L1 (with or without L2)</b>: targets the ganglia serving the groin, giving focal coverage that is hard to achieve with conventional SCS, with less positional variation</td></tr>\n        <tr><td class=\"rh\">Conventional SCS</td><td>Paraesthesia coverage of the groin is often difficult; consider if pain is more widespread</td></tr>\n      </table>"
                    }
                  ]
                },
                {
                  "key": "q2",
                  "label": "Question 2",
                  "kind": "clinsci",
                  "timerMinutes": 7.5,
                  "subtitle": "Physiology — Cancer pain",
                  "questions": [
                    {
                      "number": "2.1",
                      "prompt": "What is the pathophysiology of cancer pain?",
                      "criteria": [
                        {
                          "text": "Describes **direct tumour infiltration and compression** of tissues and nerves",
                          "strong": false
                        },
                        {
                          "text": "Describes tumour-derived **inflammatory and chemical mediators**",
                          "strong": false
                        },
                        {
                          "text": "Describes mechanisms of **bone pain**",
                          "strong": false
                        },
                        {
                          "text": "Recognises pain **caused by cancer treatment**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Mechanism</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Direct tumour effects</td><td>Infiltration of tissues; compression of nerves and surrounding structures</td></tr>\n        <tr><td class=\"rh\">Mediators</td><td>Tumour cells, necrosis and immune cells release endothelin-1, prostaglandins, bradykinin, NGF, cytokines and protons, which activate and sensitise nociceptors</td></tr>\n        <tr><td class=\"rh\">Tissue remodelling</td><td>Tumour-driven nerve growth (neurogenesis) and angiogenesis alter pain sensitivity</td></tr>\n        <tr><td class=\"rh\">Bone metastases</td><td>Osteoclast activation (RANKL); an acidic microenvironment activating TRPV1 and ASIC channels; periosteal nociceptor sensitisation and microfractures; then peripheral and central sensitisation</td></tr>\n        <tr><td class=\"rh\">Treatment-related</td><td>Persistent post-surgical pain, chemotherapy-induced peripheral neuropathy, radiotherapy-related plexopathy or fibrosis</td></tr>\n      </table>"
                    },
                    {
                      "number": "2.2",
                      "prompt": "What types of pain do patients with cancer experience?",
                      "criteria": [
                        {
                          "text": "Distinguishes **somatic** and **visceral** nociceptive pain",
                          "strong": false
                        },
                        {
                          "text": "Recognises **neuropathic** cancer pain, with examples",
                          "strong": false
                        },
                        {
                          "text": "Describes **breakthrough pain** and its subtypes",
                          "strong": false
                        },
                        {
                          "text": "Mentions the concept of **total pain** (Cicely Saunders)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Type</th><th style=\"width:36%\">Character</th><th>Examples</th></tr>\n        <tr><td class=\"rh\">Somatic nociceptive</td><td>Well localised, aching</td><td>Bone metastases, soft tissue invasion</td></tr>\n        <tr><td class=\"rh\">Visceral nociceptive</td><td>Poorly localised, cramping or deep, often referred</td><td>Capsular stretch, obstruction of hollow organs</td></tr>\n        <tr><td class=\"rh\">Neuropathic</td><td>Burning, shooting; mixed pain is common</td><td>Plexopathy, nerve root or spinal cord compression, chemotherapy-induced neuropathy</td></tr>\n      </table>\n      <p><b>Breakthrough pain:</b> a transient flare above otherwise controlled background pain. Subtypes are <b>incident</b> (movement-related), <b>spontaneous</b>, and <b>end-of-dose failure</b>.</p>\n      <p><b>Total pain:</b> physical, psychological, social and spiritual suffering all contribute, so management must address every domain. Nociplastic mechanisms may also contribute.</p>"
                    },
                    {
                      "number": "2.3",
                      "prompt": "Which neuraxial techniques can be used for cancer pain?",
                      "criteria": [
                        {
                          "text": "Mentions **epidural** analgesia (tunnelled catheter, infusion or bolus)",
                          "strong": false
                        },
                        {
                          "text": "Mentions **intrathecal** infusion via an externalised catheter or an implanted **ITDD**",
                          "strong": false
                        },
                        {
                          "text": "Mentions **intrathecal neurolysis**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Technique</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Epidural</td><td>Local anaesthetic, opioid and adjuvants via tunnelled catheters or ports. Better pain control than systemic opioids in refractory cancer pain; most effective for somatic nociceptive pain, with neuropathic pain the most refractory. Bolus and continuous delivery appear similarly effective</td></tr>\n        <tr><td class=\"rh\">Intrathecal infusion</td><td>Tunnelled externalised catheter (typically in the terminally ill), or an implanted programmable pump (ITDD) when life expectancy is longer</td></tr>\n        <tr><td class=\"rh\">Intrathecal neurolysis</td><td>For localised somatic pain in the terminally ill, such as a saddle block for perineal pain</td></tr>\n      </table>"
                    },
                    {
                      "number": "2.4",
                      "prompt": "Which neurolytic agents are used, and how does one of them work?",
                      "criteria": [
                        {
                          "text": "Names **phenol** and **alcohol**",
                          "strong": false
                        },
                        {
                          "text": "Knows the **baricity** (phenol hyperbaric, alcohol hypobaric) and its effect on positioning",
                          "strong": false
                        },
                        {
                          "text": "Explains the mechanism of one agent",
                          "strong": false
                        },
                        {
                          "text": "Contrasts injection pain, neuritis risk and duration",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:22%\"></th><th style=\"width:39%\">Alcohol (50–100%)</th><th>Phenol (3–12%, often in glycerol)</th></tr>\n        <tr><td class=\"rh\">Baricity</td><td><b>Hypobaric</b> to CSF: rises and spreads widely</td><td><b>Hyperbaric</b>: smaller volumes needed</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Positioning</td><td>Painful side <b>uppermost</b></td><td>Painful side <b>dependent</b></td></tr>\n        <tr><td class=\"rh\">Mechanism</td><td>Denatures proteins, extracts lipids, and precipitates lipoproteins and mucoproteins in nerve tissue</td><td>Denatures proteins in axons and perineural vessels, causing Wallerian degeneration</td></tr>\n        <tr><td class=\"rh\">Injection</td><td>Painful</td><td>Relatively painless (has local anaesthetic properties)</td></tr>\n        <tr><td class=\"rh\">Neuritis</td><td>Higher risk</td><td>Lower risk</td></tr>\n        <tr><td class=\"rh\">Block</td><td>Denser and longer lasting</td><td>Less intense and shorter</td></tr>\n      </table>\n      <p><b>Saddle block for perineal pain:</b> about 0.8 to 1 ml of 5 to 10% phenol in glycerol at the lowest lumbar interspace, patient sitting and inclined at about 45° for around 30 minutes. Risk of bladder and bowel dysfunction.</p>\n      <p>Nerves regenerate, so pain may recur after about 3 to 6 months.</p>"
                    },
                    {
                      "number": "2.5",
                      "prompt": "Which neuroablative procedures are used for refractory cancer pain?",
                      "criteria": [
                        {
                          "text": "Names **cordotomy** and its indication",
                          "strong": false
                        },
                        {
                          "text": "Names at least one other procedure",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Procedure</th><th style=\"width:36%\">Indication</th><th>Target</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Cordotomy</td><td>Unilateral pain below the C4 dermatome</td><td>Contralateral lateral spinothalamic tract</td></tr>\n        <tr><td class=\"rh\">Midline myelotomy</td><td>Midline abdominopelvic visceral pain</td><td>Postsynaptic dorsal column visceral pathway</td></tr>\n        <tr><td class=\"rh\">DREZ lesioning</td><td>Neuropathic pain in a defined territory (such as brachial plexus infiltration, Pancoast tumour)</td><td>Dorsal root entry zone</td></tr>\n        <tr><td class=\"rh\">Thalamotomy</td><td>Midline or bilateral pain</td><td>Medial thalamus (initial relief up to about 80%; recurrence in about 30% within a year)</td></tr>\n        <tr><td class=\"rh\">Cingulotomy</td><td>Diffuse bilateral pain with a strong affective component</td><td>Anterior cingulate</td></tr>\n      </table>\n      <p><b>Others:</b> rhizotomy, mesencephalotomy, trigeminal tractotomy; non-invasive MR-guided focused ultrasound for bone lesions. Performed in only a few tertiary centres; evidence is mainly case series.</p>"
                    },
                    {
                      "number": "2.6",
                      "prompt": "Describe how a percutaneous cervical cordotomy is performed, and its complications.",
                      "criteria": [
                        {
                          "text": "Describes an **awake** procedure under local anaesthetic with or without sedation at **C1/2**",
                          "strong": false
                        },
                        {
                          "text": "Lesions the **contralateral** anterolateral cord (lateral spinothalamic tract)",
                          "strong": false
                        },
                        {
                          "text": "Places the electrode **anterior to the dentate ligament**",
                          "strong": false
                        },
                        {
                          "text": "Describes **sensory and motor testing** before lesioning",
                          "strong": false
                        },
                        {
                          "text": "Mentions complications, including **mirror pain** and respiratory risk",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Indication:</b> unilateral, mainly nociceptive incident (movement-related) cancer pain below C4, with limited life expectancy (about 12 to 18 months). Up to 80% achieve near-complete relief. Less suitable for deafferentation or visceral pain.</p>\n      <div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">1 · Position</span>Supine, local anaesthetic and conscious sedation so the patient can report sensations; lateral C1/2 approach under fluoroscopy or CT, opposite the pain</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">2 · Locate</span>Subarachnoid puncture; myelogram outlines the cord and dentate ligament; electrode just <b>anterior to the dentate ligament</b>; impedance rise confirms cord entry</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">3 · Test</span>Sensory (about 100 Hz) reproduces heat, cold or pain in the painful area; motor (2 Hz) confirms distance from the corticospinal tract</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">4 · Lesion</span>RF lesion; loss of temperature sensation on the painful side confirms effect</div>\n      </div>\n      <p><b>Afterwards:</b> 2 to 5 days in hospital or hospice to reduce opioids safely.</p>\n      <p><b>Complications:</b> headache, neck pain, nausea, Horner's syndrome, urinary retention, weakness or hemiparesis (6 to 8%), <b>mirror pain</b> on the opposite side, pain recurrence, and <b>respiratory compromise</b> if the reticulospinal tract is lesioned.</p>"
                    },
                    {
                      "number": "2.7",
                      "prompt": "What is the evidence for cordotomy?",
                      "criteria": [
                        {
                          "text": "Knows a **cordotomy register** exists",
                          "strong": false
                        },
                        {
                          "text": "Knows cordotomy has the strongest evidence of the neuroablative procedures for cancer pain",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li>Cordotomy has the strongest recommendation of the neuroablative procedures (Congress of Neurological Surgeons <b>level 2</b>, against level 3 for the others)</li>\n        <li>The evidence base is small because the population is small, but the <b>UK cordotomy register</b> reports excellent outcomes</li>\n      </ul>"
                    },
                    {
                      "number": "2.8",
                      "prompt": "Which neuromodulation techniques are used, and what is the evidence for intrathecal drug delivery?",
                      "criteria": [
                        {
                          "text": "Mentions **intrathecal drug delivery** as the main option",
                          "strong": false
                        },
                        {
                          "text": "Knows the **life-expectancy threshold (about 3 months)** for an implanted pump",
                          "strong": false
                        },
                        {
                          "text": "Knows the evidence supporting ITDD",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>ITDD:</b> catheter connected to a programmable implanted pump. Commissioned by NHS England for severe refractory cancer pain in specialist MDT centres</li>\n        <li><b>Life expectancy of about 3 months</b> is the threshold for a fully implanted pump; a shorter prognosis favours an externalised system</li>\n        <li><b>Evidence:</b> an RCT (Smith et al., 2002) found ITDD plus medical management improved pain and reduced drug toxicity compared with medical management alone. The overall evidence is strong and is endorsed by the Polyanalgesic Consensus Conference (PACC)</li>\n        <li><b>SCS:</b> mainly for cancer survivors with chemotherapy-induced neuropathy or persistent post-surgical pain; evidence in cancer pain is low</li>\n        <li><b>Non-invasive brain stimulation</b> (rTMS) is emerging</li>\n      </ul>"
                    }
                  ]
                },
                {
                  "key": "q3",
                  "label": "Question 3",
                  "kind": "clinsci",
                  "timerMinutes": 7.5,
                  "subtitle": "Pharmacology — Opioids",
                  "questions": [
                    {
                      "number": "3.1",
                      "prompt": "Describe the opioid receptors and how opioids produce analgesia.",
                      "criteria": [
                        {
                          "text": "Names the receptors (**MOP / µ, DOP / δ, KOP / κ**, NOP)",
                          "strong": false
                        },
                        {
                          "text": "Knows they are **G-protein coupled (Gi/o)** receptors",
                          "strong": false
                        },
                        {
                          "text": "Describes the cellular effects (**reduced cAMP, K⁺ efflux, reduced Ca²⁺ influx**)",
                          "strong": false
                        },
                        {
                          "text": "Describes the sites of action (presynaptic, postsynaptic, supraspinal, peripheral)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Receptors:</b> MOP (µ), DOP (δ), KOP (κ) and NOP (nociceptin/orphanin FQ). Most clinical opioids act mainly at MOP.</p>\n      <div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Gi/o GPCR</span>Opioid binds; inhibitory G-protein activated</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Adenylyl cyclase</span>Inhibited: <b>reduced cAMP</b></div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">K⁺ channels</span>Inwardly rectifying K⁺ channels open: <b>hyperpolarisation</b></div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Ca²⁺ channels</span>Voltage-gated Ca²⁺ channels close: <b>less transmitter release</b></div>\n      </div>\n      <table class=\"kt\">\n        <tr><th style=\"width:24%\">Site</th><th>Action</th></tr>\n        <tr><td class=\"rh\">Presynaptic</td><td>Primary afferent terminals in the dorsal horn: less glutamate and substance P release</td></tr>\n        <tr><td class=\"rh\">Postsynaptic</td><td>Dorsal horn neurones hyperpolarised</td></tr>\n        <tr><td class=\"rh\">Supraspinal</td><td>PAG and RVM: disinhibition of descending inhibitory pathways</td></tr>\n        <tr><td class=\"rh\">Peripheral</td><td>Peripheral terminals, especially in inflammation</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.2",
                      "prompt": "What is the maximum oral morphine equivalent dose that should be prescribed?",
                      "criteria": [
                        {
                          "text": "Knows the **Opioids Aware** threshold of 90 mg OME",
                          "strong": false
                        },
                        {
                          "text": "Recognises that ineffective opioids should be **tapered at any dose**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>FPM Opioids Aware:</b> maximum of <b>90 mg/day oral morphine equivalent</b>, with an ideal target of no more than <b>50 mg/day</b></li>\n        <li>If a patient is still in significant pain on opioids, the opioids are not working and should be tapered, even at lower doses</li>\n      </ul>"
                    },
                    {
                      "number": "3.3",
                      "prompt": "What are the long-term harms of opioid therapy?",
                      "criteria": [
                        {
                          "text": "Mentions **endocrine** effects (hypogonadism, adrenal suppression)",
                          "strong": false
                        },
                        {
                          "text": "Mentions other physical harms (immunosuppression, sleep-disordered breathing, constipation, falls)",
                          "strong": false
                        },
                        {
                          "text": "Mentions **tolerance, dependence, addiction** and overdose risk",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Domain</th><th>Harms</th></tr>\n        <tr><td class=\"rh\">Endocrine</td><td>Hypogonadism (low testosterone, reduced libido, osteoporosis); adrenal suppression</td></tr>\n        <tr><td class=\"rh\">Physical</td><td>Immunosuppression; sleep-disordered breathing; constipation; falls and fractures in older people</td></tr>\n        <tr><td class=\"rh\">Behavioural</td><td>Tolerance, dependence and addiction; opioid-induced hyperalgesia; overdose, especially with gabapentinoids, benzodiazepines or alcohol</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.4",
                      "prompt": "What is opioid-induced hyperalgesia, and how does it differ from tolerance?",
                      "criteria": [
                        {
                          "text": "Defines OIH as a **paradoxical increase in pain sensitivity**",
                          "strong": false
                        },
                        {
                          "text": "Describes **tolerance** correctly",
                          "strong": false
                        },
                        {
                          "text": "Distinguishes the two by the **response to dose change** and pain distribution",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>OIH:</b> a paradoxical increase in pain sensitivity caused by opioid exposure. <b>Tolerance:</b> the same dose gives less effect.</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:26%\"></th><th style=\"width:37%\">Tolerance</th><th>Opioid-induced hyperalgesia</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Dose increase</td><td>Pain improves</td><td>Pain worsens</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Dose reduction</td><td>Pain worsens</td><td>Pain improves</td></tr>\n        <tr><td class=\"rh\">Distribution</td><td>Original site</td><td>Diffuse, beyond the original site, with allodynia</td></tr>\n        <tr><td class=\"rh\">QST</td><td>Thresholds unchanged</td><td>Reduced pain thresholds</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.5",
                      "prompt": "What is the pathophysiology of OIH?",
                      "criteria": [
                        {
                          "text": "Identifies **NMDA receptor** activation as the central mechanism",
                          "strong": false
                        },
                        {
                          "text": "Mentions at least one other mechanism (dynorphin, descending facilitation, glial activation)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>NMDA receptor activation</b> (glutamate, protein kinase C): the central mechanism</li>\n        <li><b>Spinal dynorphin</b> upregulation, enhancing excitatory transmitter release</li>\n        <li><b>Descending facilitation</b> from the rostral ventromedial medulla (ON cells)</li>\n        <li><b>Glial activation</b> via toll-like receptor 4 (TLR4)</li>\n        <li>Neuroexcitatory metabolites (such as morphine-3-glucuronide), reduced glutamate reuptake, genetic factors (such as COMT)</li>\n      </ul>"
                    },
                    {
                      "number": "3.6",
                      "prompt": "How would you manage suspected OIH?",
                      "criteria": [
                        {
                          "text": "Explains the diagnosis and **reduces or tapers** the opioid",
                          "strong": false
                        },
                        {
                          "text": "Mentions **opioid rotation**",
                          "strong": false
                        },
                        {
                          "text": "Mentions **NMDA antagonists** or other adjuncts",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li>Explain the diagnosis; <b>reduce and taper</b> the opioid</li>\n        <li><b>Opioid rotation:</b> such as to buprenorphine or methadone (which has NMDA antagonist activity)</li>\n        <li><b>Adjuncts:</b> ketamine or magnesium (NMDA antagonism), α2-agonists (clonidine), NSAIDs or COX-2 inhibitors; non-drug multimodal pain management</li>\n      </ul>"
                    },
                    {
                      "number": "3.7",
                      "prompt": "How would you taper a patient's opioid?",
                      "criteria": [
                        {
                          "text": "Agrees a **shared plan** with the patient",
                          "strong": false
                        },
                        {
                          "text": "Describes a reasonable **rate of reduction** (about 10% every 1 to 2 weeks)",
                          "strong": false
                        },
                        {
                          "text": "Mentions monitoring for **withdrawal** and support",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Agree</span>Shared plan; explain that pain often does not worsen and may improve</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Simplify</span>One drug at a time; consider switching to a single long-acting agent first</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Reduce</span>About <b>10% of the starting dose every 1 to 2 weeks</b>; slower after long-term use</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Support</span>Monitor withdrawal, mood and risk; psychology and non-drug strategies; involve the GP</div>\n      </div>"
                    },
                    {
                      "number": "3.8",
                      "prompt": "What is the law on driving while taking opioids?",
                      "criteria": [
                        {
                          "text": "Knows the law sets limits for some drugs, including **morphine**",
                          "strong": false
                        },
                        {
                          "text": "Knows the **statutory medical defence**",
                          "strong": false
                        },
                        {
                          "text": "Distinguishes the **legal limit from impairment**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:30%\">Offence</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Section 5A, Road Traffic Act 1988 (drug driving, since March 2015)</td><td>Driving above a specified blood limit for certain drugs, including <b>morphine (80 µg/L)</b>, <b>methadone (500 µg/L)</b> and several benzodiazepines. Codeine is metabolised to morphine and can produce a detectable level. <b>Statutory medical defence</b> if the drug was taken as prescribed and the driver was not impaired</td></tr>\n        <tr><td class=\"rh\">Section 4</td><td>Driving while <b>impaired</b> by any drug, even below the specified limit or when the drug is prescribed</td></tr>\n      </table>\n      <p><b>Advice to patients:</b> do not drive when starting or changing the dose, if drowsy, or with alcohol or other sedatives.</p>"
                    },
                    {
                      "number": "3.9",
                      "prompt": "What are the DVLA rules for Group 1 and Group 2 drivers?",
                      "criteria": [
                        {
                          "text": "Knows prescribed, non-impairing opioid use generally does not need notification in either group",
                          "strong": false
                        },
                        {
                          "text": "Knows **misuse or dependence** must be notified in both groups",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:28%\"></th><th style=\"width:36%\">Group 1 (cars, motorcycles)</th><th>Group 2 (lorries, buses)</th></tr>\n        <tr><td class=\"rh\">Prescribed opioids, not impaired</td><td colspan=\"2\">Generally no need to notify the DVLA</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Misuse or dependence</td><td>Must notify; licence refused or revoked for <b>1 year</b></td><td>Must notify; licence refused or revoked for <b>3 years</b></td></tr>\n        <tr><td class=\"rh\">Supervised methadone or buprenorphine programme</td><td>May be licensed after a favourable assessment, with annual review</td><td>Only in exceptional circumstances</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.10",
                      "prompt": "How would you recognise and manage opioid withdrawal?",
                      "criteria": [
                        {
                          "text": "Describes the **features** of withdrawal",
                          "strong": false
                        },
                        {
                          "text": "Mentions a **scoring tool** (such as COWS)",
                          "strong": false
                        },
                        {
                          "text": "Describes management",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Features:</b> anxiety, restlessness, yawning, rhinorrhoea, lacrimation, piloerection, mydriasis, sweating, abdominal cramps, diarrhoea, myalgia, tachycardia</li>\n        <li><b>Scoring:</b> Clinical Opiate Withdrawal Scale (COWS)</li>\n        <li><b>Management:</b> slow or pause the taper; symptomatic relief with loperamide, an antiemetic, lofexidine (α2-agonist) and simple analgesia; reassure that symptoms are self-limiting</li>\n      </ul>"
                    },
                    {
                      "number": "3.11",
                      "prompt": "What is dependence, and how would you screen for problematic opioid use?",
                      "criteria": [
                        {
                          "text": "Distinguishes **physiological dependence** from addiction",
                          "strong": false
                        },
                        {
                          "text": "Names at least **one screening tool**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:28%\"></th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Physiological dependence</td><td>Adaptation such that withdrawal occurs on stopping, dose reduction or antagonist use. Expected with regular use; not the same as addiction</td></tr>\n        <tr><td class=\"rh\">Addiction</td><td>Compulsive, harmful use and behaviours despite harm</td></tr>\n        <tr><td class=\"rh\">Before prescribing</td><td>Opioid Risk Tool, SOAPP-R</td></tr>\n        <tr><td class=\"rh\">During treatment</td><td>COMM, POMI, PODS, Severity of Dependence Scale; urine drug testing</td></tr>\n      </table>"
                    }
                  ]
                },
                {
                  "key": "q4",
                  "label": "Question 4",
                  "kind": "clinsci",
                  "timerMinutes": 7.5,
                  "subtitle": "Clinical science — Transcutaneous electrical nerve stimulation (TENS)",
                  "questions": [
                    {
                      "number": "4.1",
                      "prompt": "What is TENS, and what are its components?",
                      "criteria": [
                        {
                          "text": "Defines TENS",
                          "strong": false
                        },
                        {
                          "text": "Names the components",
                          "strong": false
                        },
                        {
                          "text": "Describes the adjustable parameters",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Definition:</b> a non-invasive, self-administered technique in which pulsed electrical currents are delivered across intact skin to activate underlying nerves. Cheap, available without prescription, no risk of overdose.</p>\n      <p><b>Components:</b> portable battery-operated pulse generator, lead wires and self-adhesive electrode pads.</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:30%\">Parameter</th><th>Typical range</th></tr>\n        <tr><td class=\"rh\">Waveform</td><td>Biphasic pulsed current</td></tr>\n        <tr><td class=\"rh\">Amplitude (intensity)</td><td class=\"num\">about 0–60 mA</td></tr>\n        <tr><td class=\"rh\">Pulse duration</td><td class=\"num\">about 50–250 µs</td></tr>\n        <tr><td class=\"rh\">Frequency</td><td class=\"num\">about 1–200 Hz</td></tr>\n        <tr><td class=\"rh\">Pattern</td><td>Continuous, burst or modulated; often two channels</td></tr>\n      </table>"
                    },
                    {
                      "number": "4.2",
                      "prompt": "How does TENS produce analgesia?",
                      "criteria": [
                        {
                          "text": "Refers to the **gate control theory** (Melzack and Wall, 1965)",
                          "strong": false
                        },
                        {
                          "text": "Describes **segmental** inhibition via **Aβ fibres** in the dorsal horn",
                          "strong": false
                        },
                        {
                          "text": "Describes **extrasegmental** descending inhibition (PAG, RVM)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Gate control theory:</b> activity in large-diameter afferents inhibits transmission of nociceptive input in the dorsal horn; descending pathways can also close the gate.</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:22%\">Level</th><th>Mechanism</th></tr>\n        <tr><td class=\"rh\">Segmental</td><td>Low-intensity TENS activates <b>Aβ fibres</b>, which release inhibitory transmitters (such as GABA) onto dorsal horn transmission cells, reducing their activity and sensitisation</td></tr>\n        <tr><td class=\"rh\">Extrasegmental</td><td>Higher-intensity TENS activates <b>Aδ fibres</b>, engaging descending inhibition from the periaqueductal grey and rostral ventromedial medulla, and diffuse noxious inhibitory controls</td></tr>\n        <tr><td class=\"rh\">Peripheral</td><td>TENS impulses collide with and extinguish nociceptive impulses (more likely with intense TENS)</td></tr>\n        <tr><td class=\"rh\">Neurochemistry</td><td>Low-frequency TENS acts via <b>µ-opioid</b> and 5-HT receptors; high-frequency TENS via <b>δ-opioid</b> receptors and reduced spinal glutamate and aspartate</td></tr>\n      </table>"
                    },
                    {
                      "number": "4.3",
                      "prompt": "Describe the different TENS techniques and how each produces analgesia.",
                      "criteria": [
                        {
                          "text": "Describes **conventional TENS** (low intensity, high frequency, Aβ, segmental)",
                          "strong": false
                        },
                        {
                          "text": "Describes **acupuncture-like TENS** (high intensity, low frequency, muscle twitches, extrasegmental)",
                          "strong": false
                        },
                        {
                          "text": "Describes **intense TENS** (high intensity, high frequency, peripheral blockade)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:17%\"></th><th style=\"width:28%\">Conventional</th><th style=\"width:28%\">Acupuncture-like</th><th>Intense</th></tr>\n        <tr><td class=\"rh\">Intensity</td><td>Low</td><td>High</td><td>High (maximum tolerable)</td></tr>\n        <tr><td class=\"rh\">Frequency</td><td>High</td><td>Low</td><td>High</td></tr>\n        <tr><td class=\"rh\">Site</td><td>Over the painful area</td><td>Over muscles, acupuncture or trigger points</td><td>Over nerves arising from the painful site</td></tr>\n        <tr><td class=\"rh\">Sensation</td><td>Strong, comfortable paraesthesia</td><td>Strong, comfortable muscle twitching</td><td>Painful</td></tr>\n        <tr><td class=\"rh\">Fibres</td><td>Large-diameter non-noxious (Aβ)</td><td>Small-diameter afferents</td><td>Small-diameter afferents</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Mechanism</td><td>Segmental</td><td>Extrasegmental</td><td>Peripheral nerve blockade and extrasegmental</td></tr>\n        <tr><td class=\"rh\">Duration</td><td>Whenever in pain</td><td>15 to 30 minutes at a time</td><td>A few minutes at a time</td></tr>\n      </table>\n      <p class=\"note\">Conventional TENS is the most commonly used technique.</p>"
                    },
                    {
                      "number": "4.4",
                      "prompt": "How would you set a patient up with TENS?",
                      "criteria": [
                        {
                          "text": "Describes electrode placement, including alternatives if **allodynia** is present",
                          "strong": false
                        },
                        {
                          "text": "Advises titrating to a **strong, non-painful paraesthesia** and regular use",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Supervised trial</b> with conventional TENS first, to check it does not aggravate pain and to troubleshoot; early review, and recall the device if it is not helping</li>\n        <li><b>Electrodes</b> on sensate skin over the painful area or relevant dermatome. If allodynia is present, place them over the main nerve proximal to the pain, paravertebrally at the relevant segment, or at a contralateral mirror site</li>\n        <li><b>Titrate</b> amplitude to a strong, non-painful paraesthesia; use throughout the day as needed</li>\n        <li><b>Not</b> in water, or while driving or operating machinery</li>\n      </ul>"
                    },
                    {
                      "number": "4.5",
                      "prompt": "What are the contraindications and precautions?",
                      "criteria": [
                        {
                          "text": "Mentions **pacemakers and implanted cardiac devices**",
                          "strong": false
                        },
                        {
                          "text": "Mentions one other contraindicated site",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:26%\"></th><th>Detail</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Pacemakers and ICDs</td><td>Risk of interference; contraindicated by manufacturers. Use only away from the chest after discussion with cardiology</td></tr>\n        <tr><td class=\"rh\">Bleeding disorders</td><td>Listed by the Chartered Society of Physiotherapy</td></tr>\n        <tr><td class=\"rh\">Pregnancy</td><td>Not over the abdomen (unknown fetal effects, risk of uterine contractions)</td></tr>\n        <tr><td class=\"rh\">Epilepsy</td><td>Caution; do not apply to the head or neck</td></tr>\n        <tr><td class=\"rh\">Sites to avoid</td><td>Anterior neck (hypotension, laryngospasm), eyes, anterior and posterior chest together, broken or damaged skin, skin with reduced sensation, over active malignancy (except palliative care under specialist supervision), recent haemorrhage, thrombosis or ischaemic tissue, near transdermal patches or monitoring equipment</td></tr>\n        <tr><td class=\"rh\">Adverse effects</td><td>Rare: skin irritation, mild burns with poor technique, mild autonomic responses; allodynia may be aggravated</td></tr>\n      </table>"
                    },
                    {
                      "number": "4.6",
                      "prompt": "For which conditions is TENS used, and what does the evidence show?",
                      "criteria": [
                        {
                          "text": "Recognises the evidence is **limited or inconclusive**",
                          "strong": false
                        },
                        {
                          "text": "Names conditions with more **positive evidence**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Use:</b> nociceptive, neuropathic and musculoskeletal pain; alone for mild to moderate pain or as an adjunct for more severe pain. Many patients report satisfaction</li>\n        <li><b>Why reviews are inconclusive:</b> poor trials, with small samples, inadequate intensity (underdosing), pain measured after TENS is switched off, and co-analgesia</li>\n        <li><b>More positive evidence:</b> primary dysmenorrhoea (high-frequency TENS), knee osteoarthritis, chronic musculoskeletal pain, and reduced postoperative analgesic use when an adequate dose is applied. P6 stimulation for postoperative nausea</li>\n        <li><b>Labour pain:</b> weak evidence despite patient preference</li>\n      </ul>"
                    },
                    {
                      "number": "4.7",
                      "prompt": "What is your view on using TENS for low back pain?",
                      "criteria": [
                        {
                          "text": "Knows **NICE NG59 does not recommend TENS** for low back pain",
                          "strong": false
                        },
                        {
                          "text": "Gives a balanced view (cheap, safe, self-managed against lack of evidence)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>NICE NG59:</b> do not offer TENS for managing low back pain with or without sciatica. NICE NG193 also advises against TENS for chronic primary pain. Systematic reviews for chronic low back pain are inconclusive</li>\n        <li><b>Balanced view:</b> it is cheap, safe and supports self-management, so a patient who already finds it helpful may continue. It should not be offered or funded as a treatment; focus on exercise and combined physical and psychological approaches</li>\n      </ul>"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "key": "mock2",
          "name": "Mock Exam 2",
          "stations": [
            {
              "key": "station1",
              "name": "Station 1",
              "subtitle": "Long case + short clinical questions",
              "bigTimerMinutes": 42,
              "examinerNotes": [
                "Ask the questions in order. If the candidate cannot reach the answer, move on to the next question.",
                "Score points whenever they come up. If the candidate covers a point from an earlier question later in the station, go back and tick it.",
                "Use spare time. If time is left at the end, return to unanswered questions or ask follow-ups on the same topic rather than leave a silence.",
                "Short clinical questions. About 7 minutes each. If the candidate finishes one early, you may move on to the next.",
                "Marking checklist. Tick Yes if the candidate covered the point and No if they did not. The Key knowledge box under each checklist gives a model answer so you can recognise different phrasings; candidates do not need every detail to earn a Yes.",
                "Don't lead. If a candidate reaches an answer only after heavy prompting, do not score it."
              ],
              "parts": [
                {
                  "key": "longcase",
                  "label": "Long case",
                  "kind": "longcase",
                  "timerMinutes": 21,
                  "sections": [
                    {
                      "number": 1,
                      "title": "Assessment, imaging and diagnosis",
                      "firstIndex": 0,
                      "count": 9
                    },
                    {
                      "number": 2,
                      "title": "Pathophysiology and treatment",
                      "firstIndex": 9,
                      "count": 6
                    },
                    {
                      "number": 3,
                      "title": "Psychological, mood and work",
                      "firstIndex": 15,
                      "count": 7
                    }
                  ],
                  "candidateInstructions": [
                    "You have 10 minutes to read this case history.",
                    "You may make notes on the paper provided, and take your notes and this sheet into the examination.",
                    "You will then have a 21-minute discussion of this case with two examiners, followed by 21 minutes for three short clinical questions."
                  ],
                  "caseHistoryHtml": "<p>A 35-year-old woman attends the chronic pain clinic with chronic low back pain.</p>\n    <p>The pain started 16 years ago after a fall in her garden. She was seen in the emergency department and discharged with simple analgesia and advice to keep active.</p>\n    <p>The pain improved slightly but has never gone away. She now describes a constant, severe, dull pain in her back that can make her back \"lock up\", leaving her in severe agony.</p>\n    <p>She gets sharp, electric pains down the right thigh to the knee, and sometimes on the left. Sitting or standing for long periods makes it worse, and bending is impossible.</p>\n    <p>She has seen a chiropractor and tried massage; both helped for a couple of days before the pain returned. Her GP started morphine: she now takes Zomorph 30 mg twice daily and Oramorph for flares.</p>\n    <p>For the last 2 years she has also had ongoing severe abdominal pain that fluctuates in intensity and causes her a lot of distress. Her GP has excluded coeliac disease, and an OGD and laparoscopy were both normal.</p>\n    <p>Her past medical history includes obesity (BMI 42) and polycystic ovary syndrome. She was seen in the lumbar spine pathway 6 months ago and had an MRI (images below).</p>\n    <p>Her mobility has deteriorated: she uses a crutch indoors and a mobility scooter outside.</p>\n    <p>She works as an accountant but often takes sick leave because of flare-ups. Her employer has not been understanding and has refused to modify her duties. She feels anxious about her future and feels there is no life for her, as she struggles to socialise or do anything that brings her joy. She spends most of the day watching TV and sleeps only a few hours, on the couch.</p>\n    <p>She says she feels depressed and has occasionally felt hopeless. She smokes cannabis to help her symptoms but does not drink alcohol.</p>\n<div class=\"mri\">\n    <figure><div class=\"frame\"><img src=\"soe-packs/img/m2s1-mri-sagittal.png\" alt=\"Sagittal lumbar spine MRI\"></div></figure>\n    <figure><div class=\"frame crop-top\"><img src=\"soe-packs/img/m2s1-mri-axial.png\" alt=\"Axial lumbar spine MRI\"></div></figure>\n  </div>",
                  "questions": [
                    {
                      "number": "1.1",
                      "prompt": "Please summarise this case for us.",
                      "criteria": [
                        {
                          "text": "Gives an accurate summary, noting a **young** patient with a **high BMI**",
                          "strong": false
                        },
                        {
                          "text": "Identifies **chronic low back pain**",
                          "strong": false
                        },
                        {
                          "text": "Identifies **chronic abdominal pain** with normal investigations (visceral hypersensitivity, chronic primary pain)",
                          "strong": false
                        },
                        {
                          "text": "Identifies **anxiety and depression** with **suicide risk factors**",
                          "strong": false
                        },
                        {
                          "text": "Identifies **opioid and cannabis use**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:26%\">Problem</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Background</td><td>35-year-old woman, BMI 42, polycystic ovary syndrome</td></tr>\n        <tr><td class=\"rh\">Back pain</td><td>16 years after a fall; intermittent electric pain to the thighs (not below the knee); episodes of the back \"locking\"</td></tr>\n        <tr><td class=\"rh\">MRI</td><td>Degenerative changes: spondylolisthesis, disc bulges, Modic changes, multifidus changes; no nerve root compression</td></tr>\n        <tr><td class=\"rh\">Abdominal pain</td><td>Two years, normal investigations: possible visceral hypersensitivity or chronic primary visceral pain</td></tr>\n        <tr><td class=\"rh\">Psychosocial</td><td>Depression, anxiety, hopelessness, social isolation, poor sleep, threatened employment with an unsupportive employer</td></tr>\n        <tr><td class=\"rh\">Drugs</td><td>Regular opioids (Zomorph 30 mg twice daily plus Oramorph) without clear benefit; cannabis use</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.2",
                      "prompt": "What is your differential diagnosis for her back pain?",
                      "criteria": [
                        {
                          "text": "Considers **non-specific (mechanical)** low back pain",
                          "strong": false
                        },
                        {
                          "text": "Considers specific structural sources (facet, discogenic, vertebrogenic, spondylolisthesis or instability, sacroiliac joint)",
                          "strong": false
                        },
                        {
                          "text": "Considers **serious or inflammatory** causes to exclude (such as axial spondyloarthritis)",
                          "strong": false
                        },
                        {
                          "text": "Considers a **nociplastic** contribution or central sensitisation",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:26%\">Category</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Non-specific</td><td>Mechanical low back pain</td></tr>\n        <tr><td class=\"rh\">Possible pain generators</td><td>Facet joint, discogenic, vertebrogenic (Modic type 1 or 2 endplate change), instability from spondylolisthesis, sacroiliac joint, myofascial; hip pathology</td></tr>\n        <tr><td class=\"rh\">Leg pain</td><td>Pain to the knee without root compression fits <b>somatic referred pain</b> better than radicular pain</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Exclude</td><td>Inflammatory axial spondyloarthritis (young; morning stiffness over 30 minutes; better with exercise), infection, malignancy, fracture</td></tr>\n        <tr><td class=\"rh\">Nociplastic</td><td>Long duration, widespread distress and multiple pain sites suggest central sensitisation</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.3",
                      "prompt": "What types of pain does she have?",
                      "criteria": [
                        {
                          "text": "Identifies **nociceptive** (mechanical) back pain",
                          "strong": false
                        },
                        {
                          "text": "Distinguishes **somatic referred** pain from **radicular or neuropathic** pain",
                          "strong": false
                        },
                        {
                          "text": "Identifies **visceral or nociplastic** abdominal pain",
                          "strong": false
                        },
                        {
                          "text": "Considers drug-related pain (**opioid-induced hyperalgesia**, **narcotic bowel syndrome**, cannabinoid hyperemesis)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Pain</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Back</td><td>Nociceptive musculoskeletal pain (possible facet, disc, endplate and instability components)</td></tr>\n        <tr><td class=\"rh\">Leg</td><td><b>Somatic referred pain</b> (deep, poorly localised, not dermatomal) rather than radicular pain (lancinating, dermatomal, below the knee). No root compression on MRI, so neuropathic pain is less likely</td></tr>\n        <tr><td class=\"rh\">Abdomen</td><td>Chronic primary visceral pain (functional abdominal pain), or abdominal wall pain such as anterior cutaneous nerve entrapment (check Carnett's sign)</td></tr>\n        <tr><td class=\"rh\">Drug-related</td><td>Opioid-induced hyperalgesia; narcotic bowel syndrome (abdominal pain worsening with escalating opioids); cannabinoid hyperemesis syndrome</td></tr>\n        <tr><td class=\"rh\">Overall</td><td>Nociplastic features</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.4",
                      "prompt": "Look at her MRI. What can you see?",
                      "criteria": [
                        {
                          "text": "Identifies a **T2-weighted** sequence",
                          "strong": false
                        },
                        {
                          "text": "Identifies **spondylolisthesis**",
                          "strong": false
                        },
                        {
                          "text": "Identifies **disc bulges or protrusion** on the axial image",
                          "strong": false
                        },
                        {
                          "text": "Comments on **multifidus** changes",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Feature</th><th>What to look for</th></tr>\n        <tr><td class=\"rh\">Sequence</td><td><b>T2-weighted</b>: CSF in the thecal sac is bright</td></tr>\n        <tr><td class=\"rh\">Alignment</td><td>Low-grade <b>anterolisthesis</b> in the lower lumbar spine</td></tr>\n        <tr><td class=\"rh\">Discs</td><td>Loss of T2 signal (\"dark\", desiccated discs) and loss of height at the lower lumbar levels; bulges or protrusion on the axial image</td></tr>\n        <tr><td class=\"rh\">Endplates</td><td>Modic signal change adjacent to degenerate discs</td></tr>\n        <tr><td class=\"rh\">Canal and roots</td><td>No significant nerve root compression</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Paraspinal muscles</td><td><b>Multifidus</b> atrophy with bright fatty infiltration on the axial image, consistent with multifidus dysfunction</td></tr>\n      </table>\n      <p class=\"note\"><b>Examiner note:</b> credit a systematic approach: sequence and plane, level, alignment, discs, endplates, canal and foramina, then paraspinal muscles.</p>"
                    },
                    {
                      "number": "1.5",
                      "prompt": "How can you classify or grade spondylolisthesis?",
                      "criteria": [
                        {
                          "text": "Gives at least one classification of spondylolisthesis",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:30%\">Meyerding grade</th><th>Slip (% of the vertebral body width below)</th></tr>\n        <tr><td class=\"rh\">I</td><td class=\"num\">under 25%</td></tr>\n        <tr><td class=\"rh\">II</td><td class=\"num\">25–50%</td></tr>\n        <tr><td class=\"rh\">III</td><td class=\"num\">50–75%</td></tr>\n        <tr><td class=\"rh\">IV</td><td class=\"num\">75–100%</td></tr>\n        <tr><td class=\"rh\">V</td><td>Spondyloptosis (complete slip)</td></tr>\n      </table>\n      <table class=\"kt\">\n        <tr><th style=\"width:30%\">Wiltse type (cause)</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Dysplastic (congenital)</td><td>Rare. Abnormal formation of the facets or upper sacrum, present from birth</td></tr>\n        <tr><td class=\"rh\">Isthmic</td><td>Defect or stress fracture of the <b>pars interarticularis</b> (spondylolysis); common in adolescents and young athletes</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Degenerative</td><td><b>Most common</b>. Facet arthritis and disc degeneration in older adults, usually at L4/5</td></tr>\n        <tr><td class=\"rh\">Traumatic</td><td>Acute fracture of the posterior elements other than the pars</td></tr>\n        <tr><td class=\"rh\">Pathological</td><td>Weakened bone from tumour, infection or severe osteoporosis</td></tr>\n      </table>\n      <p class=\"note\">A sixth, iatrogenic (post-surgical) type follows decompression that removes stabilising structures.</p>"
                    },
                    {
                      "number": "1.6",
                      "prompt": "How would you distinguish somatic referred pain from radicular pain?",
                      "criteria": [
                        {
                          "text": "Describes **radicular** pain (lancinating, **dermatomal**, often **below the knee**, from an affected nerve root)",
                          "strong": false
                        },
                        {
                          "text": "Describes **somatic referred** pain (deep, aching, poorly localised, from spinal structures, usually above the knee)",
                          "strong": false
                        },
                        {
                          "text": "Mentions examination findings (**neurological signs, straight leg raise**) and imaging correlation",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:20%\"></th><th style=\"width:40%\">Radicular pain</th><th>Somatic referred pain</th></tr>\n        <tr><td class=\"rh\">Mechanism</td><td>Ectopic discharge from an inflamed or compressed nerve root</td><td>Convergence in the dorsal horn of input from facets, disc, sacroiliac joint or muscle</td></tr>\n        <tr><td class=\"rh\">Quality</td><td>Shooting, lancinating, band-like</td><td>Deep, dull, aching, poorly localised</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Distribution</td><td>Dermatomal, often <b>below the knee</b></td><td>Buttock and thigh, rarely below the knee</td></tr>\n        <tr><td class=\"rh\">Examination</td><td>May have dermatomal sensory loss, weakness, reflex change, positive straight leg raise</td><td>Normal neurology</td></tr>\n      </table>\n      <p><b>Radiculopathy</b> is the objective neurological loss. <b>In her:</b> thigh pain to the knee, varying sides, no root compression on MRI, so somatic referred pain is more likely.</p>"
                    },
                    {
                      "number": "1.7",
                      "prompt": "How would you assess this patient in clinic?",
                      "criteria": [
                        {
                          "text": "Takes a structured **pain history** including function, sleep, mood and beliefs",
                          "strong": false
                        },
                        {
                          "text": "Performs a focused **examination** (gait, spine, neurology, sacroiliac joint, hip, abdomen)",
                          "strong": false
                        },
                        {
                          "text": "Reviews **medication** and substance use",
                          "strong": false
                        },
                        {
                          "text": "Uses **validated questionnaires**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:20%\"></th><th>Detail</th></tr>\n        <tr><td class=\"rh\">History</td><td>Site, character, radiation, aggravating and relieving factors, flares; effect on function, work, sleep, mood and relationships; beliefs and expectations; previous treatments; medication, cannabis and alcohol; flags</td></tr>\n        <tr><td class=\"rh\">Examination</td><td>Gait and mobility, spinal range of movement, palpation, straight leg raise and femoral stretch, full lower limb neurology, sacroiliac joint provocation tests, hip examination, abdominal examination including Carnett's sign, BMI</td></tr>\n        <tr><td class=\"rh\">Questionnaires</td><td>Oswestry Disability Index, Brief Pain Inventory, PHQ-9, GAD-7, Pain Self-Efficacy Questionnaire, Pain Catastrophising Scale, Tampa Scale of Kinesiophobia</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.8",
                      "prompt": "Do you know any risk stratification tools for back pain? When are they used?",
                      "criteria": [
                        {
                          "text": "Names the **STarT Back** tool",
                          "strong": false
                        },
                        {
                          "text": "Describes its structure and **low / medium / high** risk categories",
                          "strong": false
                        },
                        {
                          "text": "Links each category to **matched treatment**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>STarT Back Screening Tool:</b> 9 items, including a 5-item psychosocial subscale (fear, worry, catastrophising, low mood, bothersomeness). <b>NICE NG59:</b> consider it at first contact for each new episode of low back pain, to inform shared decisions.</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:18%\">Risk</th><th style=\"width:40%\">Score</th><th>Matched care</th></tr>\n        <tr><td class=\"rh\">Low</td><td>Total 0–3</td><td>Advice and self-management</td></tr>\n        <tr><td class=\"rh\">Medium</td><td>Total 4 or more, psychosocial subscale 3 or less</td><td>Physiotherapy</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">High</td><td>Psychosocial subscale 4 or more</td><td>Psychologically informed physiotherapy, or combined physical and psychological approach</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.9",
                      "prompt": "What are red, yellow and blue flags? Which does she have?",
                      "criteria": [
                        {
                          "text": "Defines **red flags** with examples (cauda equina, malignancy, infection, fracture)",
                          "strong": false
                        },
                        {
                          "text": "Defines **yellow flags** (psychosocial factors predicting chronicity)",
                          "strong": false
                        },
                        {
                          "text": "Defines **blue flags** (perceptions about work) and **black flags** (system or employer factors)",
                          "strong": false
                        },
                        {
                          "text": "Identifies **her** yellow and blue or black flags",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:15%\">Flag</th><th style=\"width:44%\">Meaning and examples</th><th>In her</th></tr>\n        <tr><td class=\"rh\">Red</td><td>Serious pathology: cauda equina (saddle anaesthesia, bladder or bowel dysfunction, bilateral sciatica, sexual dysfunction); malignancy (history of cancer, weight loss, night pain); infection (fever, immunosuppression, IV drug use); fracture (trauma, osteoporosis, steroids); progressive neurological deficit</td><td>None reported</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Yellow</td><td>Psychosocial predictors of chronicity: belief that pain is harmful, fear-avoidance, catastrophising, low mood, passive coping, reliance on passive treatments</td><td>Depression, anxiety, hopelessness, avoidance, reliance on chiropractic and massage</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Blue</td><td>Perceptions about work: unsupportive workplace, belief that work is harmful</td><td>Unsupportive employer, frequent sick leave</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Black</td><td>System or organisational factors: employer policies, compensation, sickness systems</td><td>Employer refusing adjustments</td></tr>\n        <tr><td class=\"rh\">Orange</td><td>Psychiatric disorder</td><td>Consider with depression and hopelessness</td></tr>\n      </table>"
                    },
                    {
                      "number": "2.1",
                      "prompt": "What is the pathophysiology of degenerative spine disease?",
                      "criteria": [
                        {
                          "text": "Describes **disc degeneration** (loss of proteoglycans and water from the nucleus, annular fissures)",
                          "strong": false
                        },
                        {
                          "text": "Describes **nerve ingrowth** into the disc (discogenic pain) and inflammatory mediators",
                          "strong": false
                        },
                        {
                          "text": "Describes the knock-on effects on **facet joints, ligaments and endplates** (degenerative cascade)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">1 · Dehydration</span>Reduced proteoglycan synthesis; the nucleus loses water and height</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">2 · Fissuring</span>Annulus thickens and develops radial fissures; endplates fracture under repeated load; nuclear material leaks into annulus or endplate</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">3 · Neovascularisation</span>Cytokines (TNF-α, IL-1, IL-6) drive inflammation; new vessels and <b>sensory nerve fibres</b> grow into the inner annulus, endplate and even nucleus</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">4 · Bony change</span>Facet loading, osteophytes, Modic change</div>\n      </div>\n      <p><b>Degenerative cascade:</b> loss of disc height loads the facet joints (osteoarthritis), the ligamentum flavum thickens and osteophytes form, leading to stenosis and degenerative spondylolisthesis. Endplate damage leads to Modic changes.</p>"
                    },
                    {
                      "number": "2.2",
                      "prompt": "What are Modic changes, and what is their significance?",
                      "criteria": [
                        {
                          "text": "Describes **types 1, 2 and 3** with their MRI appearance",
                          "strong": false
                        },
                        {
                          "text": "Mentions **vertebrogenic pain** via the **basivertebral nerve** and its treatment",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Modic changes</b> are signal changes in the vertebral endplate and adjacent bone marrow on MRI, usually with degenerative disc disease.</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:14%\">Type</th><th style=\"width:34%\">Pathology</th><th style=\"width:13%\">T1</th><th style=\"width:13%\">T2</th><th>Note</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">1</td><td>Marrow oedema, inflammation</td><td>Dark</td><td>Bright</td><td>Most strongly linked with low back pain; can convert to type 2</td></tr>\n        <tr><td class=\"rh\">2</td><td>Fatty marrow replacement</td><td>Bright</td><td>Bright</td><td>More stable</td></tr>\n        <tr><td class=\"rh\">3</td><td>Subchondral sclerosis</td><td>Dark</td><td>Dark</td><td>End stage</td></tr>\n      </table>\n      <ul>\n        <li><b>Vertebrogenic pain</b> is carried by the <b>basivertebral nerve</b>. <b>Basivertebral nerve ablation</b> is an option for chronic axial low back pain with type 1 or 2 changes</li>\n        <li>Low-grade infection (<i>Cutibacterium acnes</i>) has been proposed, but the <b>AIM trial</b> of amoxicillin showed no clinically important benefit, so antibiotics are not recommended</li>\n      </ul>"
                    },
                    {
                      "number": "2.3",
                      "prompt": "How would you manage her opioids?",
                      "criteria": [
                        {
                          "text": "Knows **NICE NG59** advises against opioids for chronic low back pain",
                          "strong": false
                        },
                        {
                          "text": "Identifies the **harms** relevant to her (sleep apnoea with BMI 42, sedation with cannabis, **narcotic bowel**, hormonal effects)",
                          "strong": false
                        },
                        {
                          "text": "Describes a **tapering** plan",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>NICE NG59:</b> do not offer opioids for chronic low back pain. <b>FPM Opioids Aware:</b> if opioids are not helping, taper even at modest doses. Her dose is <b>60 mg/day oral morphine equivalent</b> plus Oramorph</li>\n        <li><b>Harms in her:</b> sedation and respiratory depression with cannabis and obesity (possible sleep apnoea); constipation; narcotic bowel syndrome (may explain the abdominal pain); hypogonadism and menstrual effects; opioid-induced hyperalgesia; dependence; overdose risk with hopelessness</li>\n      </ul>\n      <div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Agree</span>Shared plan with her and her GP</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Stop first</span>Reduce or stop as-needed Oramorph</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Taper</span>Modified-release morphine by about <b>10% every 2 to 4 weeks</b>, with review; single prescriber, limited supplies</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Support</span>Non-drug strategies and psychology; monitor mood and withdrawal</div>\n      </div>"
                    },
                    {
                      "number": "2.4",
                      "prompt": "What is the role of paracetamol? What is the NNT for paracetamol with and without an NSAID?",
                      "criteria": [
                        {
                          "text": "Knows **NICE NG59** advises against **paracetamol alone** for low back pain",
                          "strong": false
                        },
                        {
                          "text": "Knows the evidence (such as the **PACE trial**) shows no benefit in acute low back pain",
                          "strong": false
                        },
                        {
                          "text": "Quotes the approximate **NNT for paracetamol 1 g (about 3.6–3.8)**",
                          "strong": false
                        },
                        {
                          "text": "Quotes the approximate **NNT for ibuprofen plus paracetamol (about 1.5)**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>NICE NG59:</b> do not offer paracetamol alone for low back pain. Consider an oral NSAID at the lowest effective dose for the shortest time, with gastroprotection where needed</li>\n        <li><b>PACE trial</b> (Lancet, 2014): paracetamol was no better than placebo for acute low back pain. Cochrane reviews show no meaningful benefit in back pain</li>\n      </ul>\n      <table class=\"kt\">\n        <tr><th style=\"width:60%\">Oxford league table (acute postoperative pain, at least 50% relief)</th><th>NNT</th></tr>\n        <tr><td class=\"rh\">Paracetamol 1 g</td><td class=\"num\">≈ 3.6–3.8</td></tr>\n        <tr><td class=\"rh\">Ibuprofen 400 mg</td><td class=\"num\">≈ 2.5</td></tr>\n        <tr><td class=\"rh\">Ibuprofen 200 mg + paracetamol 500 mg</td><td class=\"num\">≈ 1.6</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Ibuprofen 400 mg + paracetamol 1 g</td><td class=\"num\"><b>≈ 1.5</b></td></tr>\n      </table>"
                    },
                    {
                      "number": "2.5",
                      "prompt": "What is the role of TENS and other physical therapies in her back pain?",
                      "criteria": [
                        {
                          "text": "Knows **NICE NG59** advises **against TENS**, interferential therapy and ultrasound",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:22%\">NICE NG59</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Do not offer</td><td>TENS, interferential therapy, ultrasound, traction, belts, corsets or orthotics</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Offer</td><td>Exercise, such as a group exercise programme (biomechanical, aerobic, mind–body)</td></tr>\n        <tr><td class=\"rh\">Consider</td><td>Manual therapy (manipulation, mobilisation, massage) only as part of a package including exercise, which explains why chiropractic and massage alone gave only brief relief</td></tr>\n        <tr><td class=\"rh\">Consider</td><td>Combined physical and psychological programme (CBT-informed) for significant psychosocial obstacles; weight management</td></tr>\n      </table>"
                    },
                    {
                      "number": "2.6",
                      "prompt": "Are there any interventions you would consider for her back pain?",
                      "criteria": [
                        {
                          "text": "Considers **medial branch blocks, then RF denervation** if facet pain is suspected (NICE criteria)",
                          "strong": false
                        },
                        {
                          "text": "Links **multifidus dysfunction** to **restorative neurostimulation**",
                          "strong": false
                        },
                        {
                          "text": "Links **Modic changes** to **basivertebral nerve ablation**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:28%\">Intervention</th><th>When</th></tr>\n        <tr><td class=\"rh\">RF denervation</td><td>NICE NG59: if the main source is thought to be the facet joints, pain is moderate to severe (5 or more out of 10) and a diagnostic medial branch block is positive. Do not offer spinal injections</td></tr>\n        <tr><td class=\"rh\">Restorative neurostimulation</td><td>Implanted medial branch stimulation to activate multifidus (such as ReActiv8) for refractory mechanical low back pain with multifidus dysfunction</td></tr>\n        <tr><td class=\"rh\">Basivertebral nerve ablation</td><td>Vertebrogenic pain with Modic type 1 or 2 changes</td></tr>\n        <tr><td class=\"rh\">Spinal surgery</td><td>Opinion only if instability or progressive slip. NICE advises against spinal fusion except within a randomised trial</td></tr>\n      </table>\n      <p class=\"note\"><b>Examiner note:</b> credit candidates who say interventions are likely to fail unless mood, opioids and cannabis are addressed first.</p>"
                    },
                    {
                      "number": "3.1",
                      "prompt": "What psychological approaches would you use?",
                      "criteria": [
                        {
                          "text": "Recommends **CBT or ACT**-based therapy",
                          "strong": false
                        },
                        {
                          "text": "Offers a **pain management programme**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>NICE NG59:</b> consider a combined physical and psychological programme (CBT-informed) for persistent low back pain with significant psychosocial obstacles to recovery</li>\n        <li><b>Pain management programme:</b> group programme with psychologist, physiotherapist and pain clinician. Pain education, pacing, graded activity and exercise, goal setting, sleep, relaxation, flare-up planning and return to work; CBT or ACT-based</li>\n        <li><b>For her:</b> suitable in principle given high impact and distress, but depression, hopelessness, opioid tapering and cannabis use should be addressed first so she can engage. Treat depression through NHS Talking Therapies or psychology</li>\n      </ul>"
                    },
                    {
                      "number": "3.2",
                      "prompt": "How does her weight contribute to her clinical presentation?",
                      "criteria": [
                        {
                          "text": "Explains that **obesity** increases **mechanical load** and is **pro-inflammatory**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Effect</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Mechanical</td><td>Increased spinal and joint load; accelerated disc and facet degeneration</td></tr>\n        <tr><td class=\"rh\">Inflammatory</td><td>Adipokines (such as leptin, IL-6, TNF-α) promote low-grade systemic inflammation and sensitisation</td></tr>\n        <tr><td class=\"rh\">Function and mood</td><td>Worsens deconditioning, sleep (obstructive sleep apnoea) and mood</td></tr>\n        <tr><td class=\"rh\">Treatment risk</td><td>Positioning, imaging quality and sedation risk for procedures and surgery; opioid respiratory risk</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.3",
                      "prompt": "What do you think about her abdominal pain?",
                      "criteria": [
                        {
                          "text": "Considers **chronic primary visceral pain** or functional abdominal pain (such as **IBS**)",
                          "strong": false
                        },
                        {
                          "text": "Considers **opioid-related** (narcotic bowel) and **cannabis-related** causes",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:28%\">Cause</th><th>Features</th></tr>\n        <tr><td class=\"rh\">Chronic primary visceral pain (ICD-11)</td><td>After normal investigations: irritable bowel syndrome or centrally mediated abdominal pain syndrome (Rome IV)</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Narcotic bowel syndrome</td><td>Paradoxical worsening of abdominal pain with continued or escalating opioids; improves with opioid withdrawal</td></tr>\n        <tr><td class=\"rh\">Cannabinoid hyperemesis syndrome</td><td>Cyclical nausea, vomiting and abdominal pain, relieved by hot showers</td></tr>\n        <tr><td class=\"rh\">Abdominal wall pain</td><td>Anterior cutaneous nerve entrapment: positive Carnett's sign</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.4",
                      "prompt": "What are you worried about with regards to her mental health?",
                      "criteria": [
                        {
                          "text": "Identifies **suicide risk** in her",
                          "strong": false
                        },
                        {
                          "text": "Knows general risk factors (**previous attempts**, mental illness, **substance misuse**, **chronic pain**, social isolation, access to means)",
                          "strong": false
                        },
                        {
                          "text": "Recognises that **chronic pain itself** increases suicide risk",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\"></th><th>Detail</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Her risk factors</td><td>Depression, anxiety, hopelessness, social isolation, sleep disturbance, threatened employment and finances, chronic pain, access to opioids, cannabis use</td></tr>\n        <tr><td class=\"rh\">Protective factors</td><td>Family, reasons for living, engagement with services</td></tr>\n      </table>\n      <p>Chronic pain roughly <b>doubles</b> the risk of death by suicide.</p>"
                    },
                    {
                      "number": "3.5",
                      "prompt": "What are the risk factors for suicide?",
                      "criteria": [
                        {
                          "text": "Mentions at least **four** factors",
                          "strong": false
                        },
                        {
                          "text": "Recognises that **chronic pain itself** increases suicide risk",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Domain</th><th>Risk factors</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Pain-related</td><td>Pain intensity and type, sleep disturbance, pain catastrophising, opioid use</td></tr>\n        <tr><td class=\"rh\">Sociodemographic</td><td>Male sex, LGBT, ethnic minority; stressful life events (job loss, relationship instability); lack of social support</td></tr>\n        <tr><td class=\"rh\">Personal background</td><td>Substance misuse; bereavement by suicide or exposure to others' suicidal behaviour; suicide-promoting websites or social media; access to lethal means</td></tr>\n        <tr><td class=\"rh\">Psychological</td><td>Previous self-harm or suicide attempt; mental illness (especially recent relapse or discharge from inpatient care); impulsivity or personality disorder; disengagement from services; hopelessness, helplessness, guilt; entrapment or shame; psychotic phenomena</td></tr>\n      </table>\n      <p>The risk of death by suicide is about <b>twice as high</b> in people with chronic pain.</p>"
                    },
                    {
                      "number": "3.6",
                      "prompt": "How would you screen for anxiety and depression, and what would you do if you were worried about suicide?",
                      "criteria": [
                        {
                          "text": "Names screening tools (**PHQ-9**, **GAD-7**, HADS)",
                          "strong": false
                        },
                        {
                          "text": "Asks **directly** about suicidal thoughts, plans, intent and means",
                          "strong": false
                        },
                        {
                          "text": "Describes safe actions to manage the patient",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Screening:</b> PHQ-9 (depression; item 9 asks about thoughts of self-harm), GAD-7 (anxiety), HADS; PHQ-2 and GAD-2 as brief screens</li>\n        <li><b>Ask directly</b> about thoughts of death, suicidal ideation, plans, intent, preparations and access to means. Asking does not increase risk</li>\n        <li><b>NICE NG225:</b> do not use risk assessment tools or scales to predict suicide or decide treatment; use a psychosocial assessment</li>\n      </ul>\n      <table class=\"kt\">\n        <tr><th style=\"width:24%\">Situation</th><th>Action</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Immediate risk</td><td>Do not leave her alone; urgent referral to the crisis or liaison mental health team</td></tr>\n        <tr><td class=\"rh\">Otherwise</td><td>Collaborative safety plan; reduce access to means (limited opioid supplies); inform the GP; refer to NHS Talking Therapies or psychology; document and communicate</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.7",
                      "prompt": "How would you address her work situation?",
                      "criteria": [
                        {
                          "text": "Refers to **occupational health**",
                          "strong": false
                        },
                        {
                          "text": "Knows employers must consider **reasonable adjustments**",
                          "strong": false
                        },
                        {
                          "text": "Mentions vocational support (such as **Access to Work**)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Work is good for health;</b> keeping her in work is a key goal</li>\n        <li><b>Occupational health referral</b> and a fit note recommending adjustments: phased return, amended duties, flexible hours, workstation changes</li>\n        <li><b>Equality Act 2010:</b> chronic pain with a substantial effect lasting, or likely to last, 12 months or more may count as a disability, so the employer must consider reasonable adjustments</li>\n        <li><b>Support:</b> Access to Work grants, vocational rehabilitation, employment advice services</li>\n      </ul>"
                    }
                  ]
                },
                {
                  "key": "scq1",
                  "label": "Short clinical Q1",
                  "kind": "scq",
                  "timerMinutes": 7,
                  "subtitle": "Lateral femoral cutaneous nerve",
                  "questions": [
                    {
                      "number": "1.1",
                      "prompt": "Describe the course of the lateral femoral cutaneous nerve of the thigh.",
                      "criteria": [
                        {
                          "text": "Knows it arises from the lumbar plexus, from the ventral rami of **L2 and L3**",
                          "strong": false
                        },
                        {
                          "text": "Describes its course across **iliacus** towards the **ASIS**",
                          "strong": false
                        },
                        {
                          "text": "Describes its passage under the **inguinal ligament near the ASIS** into the thigh",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Origin</span>Lumbar plexus, posterior divisions of <b>L2 and L3</b></div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Pelvis</span>Emerges from the lateral border of psoas; crosses <b>iliacus</b> obliquely, deep to the iliac fascia, towards the ASIS</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Exit</span>Under (or through) the lateral <b>inguinal ligament</b>, usually 1–2 cm medial to the ASIS</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Thigh</span>Over or through sartorius, in the fat-filled plane between sartorius and tensor fasciae latae; pierces fascia lata and divides into anterior and posterior branches</div>\n      </div>\n      <p><b>Relations:</b> lateral to the femoral nerve and deep circumflex iliac vessels in the pelvis; superficial and close to the origin of sartorius in the thigh.</p>"
                    },
                    {
                      "number": "1.2",
                      "prompt": "What are its anatomical variations, and why are they relevant to pain?",
                      "criteria": [
                        {
                          "text": "Describes variation in **where it exits the pelvis** (over, through or lateral to the ASIS or inguinal ligament, or through sartorius)",
                          "strong": false
                        },
                        {
                          "text": "Explains the relevance: **entrapment risk**, **failed landmark blocks**, surgical injury",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:12%\">Type</th><th style=\"width:10%\">%</th><th>Anatomical route (Aszmann classification)</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">A</td><td class=\"num\">4</td><td>Posterior to the ASIS, across the iliac crest</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">B</td><td class=\"num\">27</td><td>Anterior to the ASIS and superficial to the origin of sartorius, within the substance of the inguinal ligament</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">C</td><td class=\"num\">23</td><td>Medial to the ASIS, ensheathed in the tendinous origin of sartorius</td></tr>\n        <tr><td class=\"rh\">D</td><td class=\"num\">26</td><td>Medial to the origin of sartorius, between the sartorius tendon and the thick iliopsoas fascia, deep to the inguinal ligament</td></tr>\n        <tr><td class=\"rh\">E</td><td class=\"num\">20</td><td>Most medial, in loose connective tissue deep to the inguinal ligament over the thin iliopsoas fascia, contributing to the femoral branch of the genitofemoral nerve</td></tr>\n      </table>\n      <ul>\n        <li><b>Types A to C</b> (shaded) are superficial to the inguinal ligament and more exposed to mechanical trauma and surgery, so nerve damage is more common</li>\n        <li><b>Landmark blocks</b> often miss the nerve, so ultrasound guidance is preferred. Variants raise injury risk during iliac crest bone harvest, anterior hip surgery and laparoscopic hernia repair</li>\n      </ul>"
                    },
                    {
                      "number": "1.3",
                      "prompt": "What is its sensory and motor innervation?",
                      "criteria": [
                        {
                          "text": "Knows it is **purely sensory**",
                          "strong": false
                        },
                        {
                          "text": "Describes the **anterolateral thigh** distribution",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Purely sensory:</b> no motor supply</li>\n        <li><b>Anterior branch:</b> skin of the anterior and lateral thigh as far as the knee</li>\n        <li><b>Posterior branch:</b> skin of the lateral thigh from the greater trochanter to mid-thigh</li>\n      </ul>"
                    },
                    {
                      "number": "1.4",
                      "prompt": "What condition is caused by entrapment or injury of this nerve, and what are the risk factors?",
                      "criteria": [
                        {
                          "text": "Names **meralgia paraesthetica**",
                          "strong": false
                        },
                        {
                          "text": "Names **mechanical** risk factors",
                          "strong": false
                        },
                        {
                          "text": "Names **metabolic or iatrogenic** risk factors",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Meralgia paraesthetica</b> (Bernhardt–Roth syndrome).</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:22%\">Risk factor</th><th>Examples</th></tr>\n        <tr><td class=\"rh\">Mechanical</td><td>Obesity, pregnancy, tight belts, waistbands, tool belts or body armour; prolonged standing or hip extension; leg length discrepancy; seatbelt injury</td></tr>\n        <tr><td class=\"rh\">Metabolic</td><td>Diabetes, hypothyroidism, alcohol</td></tr>\n        <tr><td class=\"rh\">Iatrogenic</td><td>Iliac crest bone graft harvest, anterior approach hip surgery, laparoscopic hernia repair or other pelvic surgery, prolonged prone or lithotomy positioning</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.5",
                      "prompt": "What are the clinical features?",
                      "criteria": [
                        {
                          "text": "Describes neuropathic pain of the **anterolateral thigh**",
                          "strong": false
                        },
                        {
                          "text": "Describes aggravating factors (**standing, walking, hip extension**) and relief with sitting",
                          "strong": false
                        },
                        {
                          "text": "Notes **no motor weakness or reflex change**, and the **differentials** (such as L2/L3 radiculopathy)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:22%\"></th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Symptoms</td><td>Burning, tingling, numbness or hypersensitivity of the anterolateral thigh; may be bilateral</td></tr>\n        <tr><td class=\"rh\">Aggravating / relieving</td><td>Worse with standing, walking, hip extension or tight clothing; eased by sitting</td></tr>\n        <tr><td class=\"rh\">Examination</td><td>Sensory change in the nerve distribution; tenderness or Tinel's sign medial to the ASIS; positive pelvic compression test. <b>No weakness, normal reflexes</b></td></tr>\n        <tr><td class=\"rh\">Differentials</td><td>L2/L3 radiculopathy, femoral neuropathy, hip pathology, greater trochanteric pain syndrome, pelvic mass</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.6",
                      "prompt": "How would you investigate suspected meralgia paraesthetica?",
                      "criteria": [
                        {
                          "text": "Knows it is mainly a **clinical diagnosis** supported by a **diagnostic block**",
                          "strong": false
                        },
                        {
                          "text": "Mentions **nerve conduction studies** (side-to-side comparison) and **high-resolution ultrasound**",
                          "strong": false
                        },
                        {
                          "text": "Excludes other causes with **imaging** (lumbar spine, pelvis) if atypical",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Clinical diagnosis;</b> an ultrasound-guided diagnostic block that relieves pain and produces numbness supports it</li>\n        <li><b>Sensory nerve conduction studies:</b> technically difficult, especially in obesity; compare with the other side</li>\n        <li><b>High-resolution ultrasound:</b> may show nerve enlargement at the inguinal ligament</li>\n        <li><b>If atypical features, weakness or red flags:</b> MRI lumbar spine for L2/L3 radiculopathy; pelvic imaging for a retroperitoneal or pelvic mass. HbA1c for diabetes</li>\n      </ul>"
                    },
                    {
                      "number": "1.7",
                      "prompt": "How would you perform an ultrasound-guided LFCN block?",
                      "criteria": [
                        {
                          "text": "Places the **linear probe just inferior and medial to the ASIS**",
                          "strong": false
                        },
                        {
                          "text": "Identifies **sartorius** and **tensor fasciae latae**, and the nerve in the **fat-filled plane between them**",
                          "strong": false
                        },
                        {
                          "text": "Uses a **small volume** of local anaesthetic, with or without steroid",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Set-up</span>Supine; aseptic technique; high-frequency linear probe transversely just below and medial to the ASIS</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Identify</span>Sartorius arising from the ASIS and tensor fasciae latae laterally; the nerve is a small hypoechoic oval in the <b>fat-filled triangle between them</b>; trace it up and down to confirm</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Inject</span>In-plane; <b>3–5 ml</b> local anaesthetic for a diagnostic block, with steroid for a therapeutic block. Check numbness in the distribution</div>\n      </div>"
                    },
                    {
                      "number": "1.8",
                      "prompt": "What are the complications of the block?",
                      "criteria": [
                        {
                          "text": "Mentions **femoral nerve block** from spread (quadriceps weakness, falls)",
                          "strong": false
                        },
                        {
                          "text": "Mentions general risks (bleeding, infection, LAST, nerve injury, failure)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Spread to the femoral nerve:</b> quadriceps weakness and falls risk; warn the patient</li>\n        <li><b>Other:</b> block failure (anatomical variation), vascular puncture or haematoma, infection, nerve injury or neuritis, local anaesthetic toxicity, steroid side effects (skin depigmentation or fat atrophy if superficial)</li>\n      </ul>"
                    },
                    {
                      "number": "1.9",
                      "prompt": "If the block gives only transient relief, what are your next steps?",
                      "criteria": [
                        {
                          "text": "Addresses **causative factors** (weight loss, loose clothing)",
                          "strong": false
                        },
                        {
                          "text": "Considers a **repeat block with steroid**, and **pulsed RF** or **cryoneurolysis**",
                          "strong": false
                        },
                        {
                          "text": "Considers **neuromodulation** (peripheral nerve stimulation) or **surgery** (decompression or neurectomy)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Step</th><th>Options</th></tr>\n        <tr><td class=\"rh\">Conservative</td><td>Weight loss, avoid tight belts and clothing, topical lidocaine, anti-neuropathic medication. Most cases resolve spontaneously</td></tr>\n        <tr><td class=\"rh\">Interventional</td><td>Repeat ultrasound-guided block with steroid; pulsed RF; cryoneurolysis</td></tr>\n        <tr><td class=\"rh\">Neuromodulation</td><td>Peripheral nerve stimulation for refractory cases</td></tr>\n        <tr><td class=\"rh\">Surgical</td><td><b>Decompression (neurolysis)</b> preserves sensation but may recur; <b>neurectomy</b> gives more reliable relief but permanent numbness of the anterolateral thigh</td></tr>\n      </table>"
                    }
                  ]
                },
                {
                  "key": "scq2",
                  "label": "Short clinical Q2",
                  "kind": "scq",
                  "timerMinutes": 7,
                  "subtitle": "Cannabinoids",
                  "questions": [
                    {
                      "number": "2.1",
                      "prompt": "What are the cannabinoid receptors, where are they found, and how do they work?",
                      "criteria": [
                        {
                          "text": "Names **CB1** and **CB2**",
                          "strong": false
                        },
                        {
                          "text": "Knows they are **Gi/o G-protein coupled** receptors",
                          "strong": false
                        },
                        {
                          "text": "Describes the distribution of CB1 and CB2",
                          "strong": false
                        },
                        {
                          "text": "Describes **retrograde signalling** reducing neurotransmitter release",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Both are Gi/o GPCRs:</b> inhibit adenylyl cyclase, open K⁺ channels and close voltage-gated Ca²⁺ channels.</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:14%\"></th><th style=\"width:46%\">CB1</th><th>CB2</th></tr>\n        <tr><td class=\"rh\">Site</td><td>Very abundant in the CNS: basal ganglia, cerebellum, hippocampus, cortex, PAG, RVM, dorsal horn; peripheral nociceptor terminals. Mainly <b>presynaptic</b></td><td>Mainly <b>immune cells</b>, spleen and <b>microglia</b> (upregulated in inflammation and neuropathic pain); low levels in neurones</td></tr>\n        <tr><td class=\"rh\">Effects</td><td>Psychoactive and analgesic</td><td>Anti-inflammatory; not psychoactive</td></tr>\n      </table>\n      <div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Postsynaptic neurone</span>Makes endocannabinoids on demand when activated</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Retrograde</span>Endocannabinoid travels back across the synapse to presynaptic CB1</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Result</span>Less glutamate or GABA release</div>\n      </div>\n      <p class=\"note\">Other targets include GPR55, TRPV1 and PPARs.</p>"
                    },
                    {
                      "number": "2.2",
                      "prompt": "What are the endogenous cannabinoids, and what effects does receptor activation produce?",
                      "criteria": [
                        {
                          "text": "Names **anandamide** and **2-AG**",
                          "strong": false
                        },
                        {
                          "text": "Describes **CNS** effects",
                          "strong": false
                        },
                        {
                          "text": "Describes **peripheral and immune** effects (anti-inflammatory, antiemetic)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:36%\">Endocannabinoid</th><th>Broken down by</th></tr>\n        <tr><td class=\"rh\">Anandamide (AEA)</td><td>Fatty acid amide hydrolase (FAAH)</td></tr>\n        <tr><td class=\"rh\">2-arachidonoylglycerol (2-AG)</td><td>Monoacylglycerol lipase (MAGL)</td></tr>\n      </table>\n      <ul>\n        <li><b>CB1 effects:</b> analgesia, sedation, euphoria, anxiety or anxiolysis, impaired memory and coordination, increased appetite, antiemetic effect, hypothermia, tachycardia</li>\n        <li><b>CB2 effects:</b> anti-inflammatory and immunomodulatory, reduced microglial activation; no psychoactive effects</li>\n      </ul>"
                    },
                    {
                      "number": "2.3",
                      "prompt": "Which therapies target the cannabinoid system, and how is paracetamol linked to it?",
                      "criteria": [
                        {
                          "text": "Names licensed cannabinoids",
                          "strong": false
                        },
                        {
                          "text": "Knows their **licensed indications**",
                          "strong": false
                        },
                        {
                          "text": "Knows the possible link between paracetamol and CB1 activation",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:36%\">Product</th><th>Licensed use (UK)</th></tr>\n        <tr><td class=\"rh\">Nabiximols (Sativex, THC:CBD spray)</td><td>Spasticity in multiple sclerosis</td></tr>\n        <tr><td class=\"rh\">Nabilone (synthetic THC analogue)</td><td>Chemotherapy-induced nausea and vomiting</td></tr>\n        <tr><td class=\"rh\">Dronabinol (synthetic THC)</td><td>Not licensed in the UK</td></tr>\n        <tr><td class=\"rh\">Cannabidiol (Epidyolex)</td><td>Seizures in Dravet syndrome, Lennox–Gastaut syndrome and tuberous sclerosis complex</td></tr>\n      </table>\n      <p><b>Experimental:</b> FAAH inhibitors (a phase 1 trial of BIA 10-2474 caused a death), peripherally restricted CB1 agonists, selective CB2 agonists.</p>\n      <div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Liver</span>Paracetamol deacetylated to p-aminophenol</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Brain</span>FAAH conjugates it with arachidonic acid to form <b>AM404</b></div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Action</span>AM404 inhibits anandamide reuptake (indirect CB1 activation) and activates TRPV1</div>\n      </div>\n      <p class=\"note\">Paracetamol also acts on descending serotonergic pathways and the peroxidase site of COX.</p>"
                    },
                    {
                      "number": "2.4",
                      "prompt": "What are the differences between THC and CBD?",
                      "criteria": [
                        {
                          "text": "Knows **THC** is an **agonist at CB1 and CB2** and **psychoactive**",
                          "strong": false
                        },
                        {
                          "text": "Knows **CBD** has **low CB1 affinity**, acts at other targets and is **non-psychoactive**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:20%\"></th><th style=\"width:40%\">THC (Δ9-tetrahydrocannabinol)</th><th>CBD (cannabidiol)</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Receptor action</td><td><b>Partial agonist</b> at CB1 and CB2</td><td>Low affinity for CB1 and CB2 (negative allosteric modulator of CB1); acts at 5-HT1A, TRPV1, GPR55 and adenosine reuptake</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Psychoactive</td><td>Yes</td><td>No</td></tr>\n        <tr><td class=\"rh\">Effects</td><td>Analgesia, euphoria, sedation, appetite; psychosis risk</td><td>Anticonvulsant, anxiolytic; may reduce some THC adverse effects</td></tr>\n        <tr><td class=\"rh\">Interactions</td><td>Additive sedation</td><td>Inhibits <b>CYP3A4 and CYP2C19</b> (clobazam, warfarin); can raise liver enzymes. Over-the-counter products vary in content</td></tr>\n      </table>"
                    },
                    {
                      "number": "2.5",
                      "prompt": "What is the evidence for cannabinoids in neuropathic pain? What is the NNT?",
                      "criteria": [
                        {
                          "text": "Knows the evidence shows **small benefit** with significant **harms**",
                          "strong": false
                        },
                        {
                          "text": "Knows the **NNT (about 20)**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:40%\">Cochrane (Mücke, 2018)</th><th>Value</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">NNT for 50% pain relief</td><td class=\"num\"><b>≈ 20</b></td></tr>\n        <tr><td class=\"rh\">NNH (withdrawal due to adverse effects)</td><td class=\"num\">≈ 25</td></tr>\n        <tr><td class=\"rh\">Evidence quality</td><td>Low</td></tr>\n      </table>\n      <ul>\n        <li><b>NeuPSIG (Finnerup, 2015):</b> weak recommendation against cannabinoids for neuropathic pain</li>\n        <li><b>IASP 2021 task force:</b> does not endorse general use for pain, because of a lack of high-quality evidence</li>\n      </ul>"
                    },
                    {
                      "number": "2.6",
                      "prompt": "When are cannabis-based medicines indicated in the UK, and is there a role in chronic pain?",
                      "criteria": [
                        {
                          "text": "Knows **NICE NG144** advises **against** them for **chronic pain**",
                          "strong": false
                        },
                        {
                          "text": "Gives the NICE-supported indications",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Since November 2018</b>, cannabis-based products for medicinal use can be prescribed in the UK, but only by doctors on the GMC Specialist Register</li>\n        <li><b>NICE NG144 (2019):</b> do not offer for chronic pain in adults (except in clinical trials)</li>\n      </ul>\n      <table class=\"kt\">\n        <tr><th style=\"width:44%\">NICE-supported indication</th><th>Product</th></tr>\n        <tr><td class=\"rh\">Moderate to severe MS spasticity</td><td>4-week trial of Sativex</td></tr>\n        <tr><td class=\"rh\">Persistent chemotherapy-induced nausea and vomiting</td><td>Nabilone as an add-on</td></tr>\n        <tr><td class=\"rh\">Dravet and Lennox–Gastaut syndromes</td><td>Cannabidiol</td></tr>\n      </table>\n      <p><b>Chronic primary pain</b> (such as fibromyalgia): evidence is weak and low quality, with small effects and frequent adverse effects. NICE does not recommend it, and the IASP does not endorse general use for pain.</p>"
                    },
                    {
                      "number": "2.7",
                      "prompt": "What are the adverse effects of cannabis use?",
                      "criteria": [
                        {
                          "text": "Names **CNS** effects",
                          "strong": false
                        },
                        {
                          "text": "Names **psychosis** and **dependence or cannabis use disorder**",
                          "strong": false
                        },
                        {
                          "text": "Names **cannabinoid hyperemesis syndrome**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:22%\">System</th><th>Adverse effects</th></tr>\n        <tr><td class=\"rh\">CNS</td><td>Sedation, dizziness, impaired memory, concentration and coordination; anxiety or paranoia; low mood</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Psychiatric</td><td><b>Psychosis</b> (especially high-THC products and in adolescents); <b>cannabis use disorder</b> (about 1 in 10 users); withdrawal (irritability, insomnia)</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">GI</td><td><b>Cannabinoid hyperemesis syndrome:</b> cyclical vomiting and abdominal pain relieved by hot showers</td></tr>\n        <tr><td class=\"rh\">Cardiorespiratory</td><td>Tachycardia, postural hypotension; respiratory harm, tar and carcinogens when smoked</td></tr>\n        <tr><td class=\"rh\">Interactions</td><td>CBD via CYP3A4 and CYP2C19 (such as clobazam); additive sedation with opioids and gabapentinoids</td></tr>\n        <tr><td class=\"rh\">Driving</td><td>THC has a specified limit of <b>2 µg/L</b> under drug-driving law</td></tr>\n        <tr><td class=\"rh\">Edibles</td><td>Delayed onset, so risk of accidental overdose and toxicity in children</td></tr>\n      </table>"
                    }
                  ]
                },
                {
                  "key": "scq3",
                  "label": "Short clinical Q3",
                  "kind": "scq",
                  "timerMinutes": 7,
                  "subtitle": "NSAIDs",
                  "questions": [
                    {
                      "number": "3.1",
                      "prompt": "Explain the mechanism of action of NSAIDs, and how it explains their side effects.",
                      "criteria": [
                        {
                          "text": "Describes **COX inhibition** reducing **prostaglandin** synthesis from arachidonic acid",
                          "strong": false
                        },
                        {
                          "text": "Distinguishes **COX-1** (constitutive) and **COX-2** (inducible)",
                          "strong": false
                        },
                        {
                          "text": "Explains **GI** toxicity (loss of protective prostaglandins)",
                          "strong": false
                        },
                        {
                          "text": "Explains **renal** (AKI) and **bleeding** (thromboxane A2) effects",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Substrate</span>Membrane phospholipids → <b>arachidonic acid</b> (phospholipase A2)</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Blocked step</span><b>COX-1 and COX-2</b> → PGH2</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Products lost</span>Prostaglandins (PGE2, PGI2) and thromboxane A2</div>\n      </div>\n      <p>Analgesic, anti-inflammatory and antipyretic, acting peripherally and centrally (spinal COX-2).</p>\n      <table class=\"kt\">\n        <tr><th style=\"width:20%\"></th><th>Detail</th></tr>\n        <tr><td class=\"rh\">COX-1</td><td>Constitutive: gastric mucosa, platelets, kidney</td></tr>\n        <tr><td class=\"rh\">COX-2</td><td>Inducible in inflammation; also constitutive in kidney and endothelium</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">GI</td><td>Loss of prostaglandin-mediated mucus and bicarbonate secretion and mucosal blood flow: dyspepsia, ulcers, bleeding</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Renal</td><td>Prostaglandins keep the afferent arteriole dilated when perfusion falls. NSAIDs cause AKI (especially with hypovolaemia, ACE inhibitors or ARBs, and diuretics), sodium and water retention, hyperkalaemia, hypertension</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Bleeding</td><td>Platelet COX-1 inhibition reduces thromboxane A2, impairing aggregation (irreversible with aspirin)</td></tr>\n        <tr><td class=\"rh\">Respiratory</td><td>NSAID-exacerbated respiratory disease from shunting of arachidonic acid to leukotrienes</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.2",
                      "prompt": "What are COX-2 inhibitors? What are their benefits, and when can they not be used?",
                      "criteria": [
                        {
                          "text": "Names examples (**celecoxib, etoricoxib, parecoxib**)",
                          "strong": false
                        },
                        {
                          "text": "Knows they cause **less GI toxicity** and are tolerated in NSAID-exacerbated respiratory disease",
                          "strong": false
                        },
                        {
                          "text": "Knows they are **contraindicated in cardiovascular disease** (IHD, cerebrovascular disease, PAD, heart failure)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:22%\"></th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Examples</td><td>Celecoxib, etoricoxib, parecoxib (IV)</td></tr>\n        <tr><td class=\"rh\">Benefits</td><td>Fewer GI ulcers and bleeds; no effect on platelet function (useful perioperatively); usually tolerated in NSAID-exacerbated respiratory disease</td></tr>\n        <tr><td class=\"rh\">No advantage</td><td>Renal effects similar to other NSAIDs</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Contraindicated</td><td>Established ischaemic heart disease, cerebrovascular disease, peripheral arterial disease, moderate to severe heart failure; etoricoxib also in uncontrolled hypertension. Avoid after CABG</td></tr>\n        <tr><td class=\"rh\">Why</td><td>Reduced endothelial prostacyclin with unopposed platelet thromboxane raises thrombotic risk</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.3",
                      "prompt": "Which NSAID has the best and worst cardiovascular profile?",
                      "criteria": [
                        {
                          "text": "Names **naproxen** or **low-dose ibuprofen** as having the best cardiovascular profile",
                          "strong": false
                        },
                        {
                          "text": "Names **diclofenac** or COX-2 inhibitors as having a **higher thrombotic risk**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:30%\">Profile</th><th>Detail</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Best</td><td><b>Naproxen</b> (up to 1000 mg/day) and <b>low-dose ibuprofen</b> (up to 1200 mg/day)</td></tr>\n        <tr><td class=\"rh\">Worst</td><td><b>Diclofenac</b> and COX-2 inhibitors raise major vascular events by about a third. <b>Diclofenac</b> is contraindicated in established cardiovascular disease (MHRA, 2013), like COX-2 inhibitors. High-dose ibuprofen (2400 mg/day) carries similar risk</td></tr>\n        <tr><td class=\"rh\">PRECISION trial</td><td>Celecoxib was non-inferior to naproxen and ibuprofen for cardiovascular events at moderate doses</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.4",
                      "prompt": "What are the NNTs for NSAIDs?",
                      "criteria": [
                        {
                          "text": "Quotes an approximate **NNT** for **ibuprofen 400 mg (about 2.5)** or another NSAID",
                          "strong": false
                        },
                        {
                          "text": "Quotes an approximate **NNT for ibuprofen plus paracetamol (about 1.5)**",
                          "strong": false
                        },
                        {
                          "text": "Gives an approximate **NNH** for serious **GI** complications with chronic use",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:60%\">Oxford league table (acute postoperative pain, at least 50% relief)</th><th>NNT</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Ibuprofen 400 mg + paracetamol 1 g</td><td class=\"num\"><b>≈ 1.5</b></td></tr>\n        <tr><td class=\"rh\">Etoricoxib 120 mg</td><td class=\"num\">≈ 1.9</td></tr>\n        <tr><td class=\"rh\">Ibuprofen 400 mg</td><td class=\"num\">≈ 2.5</td></tr>\n        <tr><td class=\"rh\">Naproxen 500 mg</td><td class=\"num\">≈ 2.7</td></tr>\n        <tr><td class=\"rh\">Diclofenac 50 mg</td><td class=\"num\">≈ 2.7</td></tr>\n      </table>\n      <p><b>NNH for serious GI harm:</b> with at least 2 months of regular NSAID use, about 1 in 1,200 people dies from gastroduodenal complications (Tramèr et al., 2000).</p>"
                    },
                    {
                      "number": "3.5",
                      "prompt": "How would you prescribe NSAIDs safely?",
                      "criteria": [
                        {
                          "text": "Uses the **lowest effective dose** for the **shortest time**",
                          "strong": false
                        },
                        {
                          "text": "Gives **gastroprotection (PPI)** to people at GI risk",
                          "strong": false
                        },
                        {
                          "text": "Monitors **renal function and blood pressure**, and prefers **topical** NSAIDs where possible",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Before starting:</b> assess GI, renal and cardiovascular risk; lowest effective dose for the shortest time; review regularly</li>\n        <li><b>PPI if at GI risk:</b> age over 65, previous ulcer or bleed, anticoagulants, antiplatelets, steroids, SSRIs; consider <i>Helicobacter pylori</i> testing</li>\n        <li><b>Monitor</b> renal function and blood pressure, especially with ACE inhibitors, diuretics or CKD; stop during dehydrating illness (\"sick day rules\")</li>\n        <li><b>Prefer topical NSAIDs</b> for localised pain (such as knee or hand osteoarthritis) and in older people</li>\n        <li><b>Cardiovascular risk:</b> avoid if significant; choose naproxen or low-dose ibuprofen if needed</li>\n        <li><b>Counsel</b> to stop and seek help with black stools, haematemesis or reduced urine output</li>\n      </ul>"
                    },
                    {
                      "number": "3.6",
                      "prompt": "What routes of administration are available? What is the paediatric dose of ibuprofen, and which strengths are available for children? Are there contraindications in children?",
                      "criteria": [
                        {
                          "text": "Names **oral**, **topical**, **rectal** and **IV** routes",
                          "strong": false
                        },
                        {
                          "text": "Gives **paediatric** formulations and dosing",
                          "strong": false
                        },
                        {
                          "text": "Knows **aspirin is avoided under 16** (Reye's syndrome)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:26%\"></th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Routes</td><td>Oral, topical, rectal, intravenous</td></tr>\n        <tr><td class=\"rh\">Formulations</td><td>Ibuprofen suspension <b>100 mg/5 ml</b> (from 3 months or over 5 kg); a 200 mg/5 ml strength is also available</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Dose</td><td><b>5 mg/kg four times daily</b> or <b>10 mg/kg three times daily</b>; maximum <b>30 mg/kg/day</b></td></tr>\n        <tr><td class=\"rh\">Contraindications</td><td><b>Aspirin under 16</b> (Reye's syndrome). Avoid ibuprofen in dehydration (AKI risk) and in chickenpox (risk of severe skin infection); caution in NSAID-sensitive asthma</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.7",
                      "prompt": "What are the contraindications to NSAIDs?",
                      "criteria": [
                        {
                          "text": "Names **medical** contraindications",
                          "strong": false
                        },
                        {
                          "text": "Names **pregnancy** (third trimester)",
                          "strong": false
                        },
                        {
                          "text": "Names **surgical** situations",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:18%\"></th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Medical</td><td>Hypersensitivity or NSAID-exacerbated respiratory disease; active peptic ulcer or GI bleeding; severe heart failure; severe renal or hepatic impairment; coagulopathy or anticoagulation (caution); dehydration</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Pregnancy</td><td>Avoid, especially from 20 weeks (oligohydramnios) and in the <b>third trimester</b> (premature closure of the ductus arteriosus)</td></tr>\n        <tr><td class=\"rh\">Surgical</td><td>High bleeding-risk procedures (neurosurgery, some ENT and plastic surgery); major haemorrhage or hypovolaemia; high AKI risk (major vascular surgery, nephrotoxins, ACE inhibitors); after CABG (COX-2 inhibitors contraindicated). Concerns about bone healing after spinal fusion or fracture, and anastomotic leak after colorectal surgery (conflicting evidence)</td></tr>\n      </table>"
                    }
                  ]
                }
              ]
            },
            {
              "key": "station2",
              "name": "Station 2",
              "subtitle": "Clinical Science",
              "bigTimerMinutes": 30,
              "examinerNotes": [
                "Ask the sub-questions in order. If the candidate cannot reach the answer, move on to the next sub-question.",
                "Score points whenever they come up. If the candidate covers a point from an earlier sub-question later on, go back and tick it.",
                "Keep to time. Move to the next question at about 7.5 minutes. If the candidate finishes early, you may move on.",
                "Use spare time. If time is left at the end, return to unanswered sub-questions or ask follow-ups on the same topic rather than leave a silence.",
                "Marking checklist. Tick Yes if the candidate covered the point and No if they did not. The Key knowledge box under each checklist gives a model answer so you can recognise different phrasings; candidates do not need every detail to earn a Yes.",
                "Don't lead. If a candidate reaches an answer only after heavy prompting, do not score it."
              ],
              "parts": [
                {
                  "key": "q1",
                  "label": "Question 1",
                  "kind": "clinsci",
                  "timerMinutes": 7.5,
                  "subtitle": "Anatomy — The spinal cord",
                  "questions": [
                    {
                      "number": "1.1",
                      "prompt": "Describe the extent of the spinal cord. Where does it end in adults and in neonates?",
                      "criteria": [
                        {
                          "text": "States it runs from the **foramen magnum** to the **conus medullaris at L1–L2** in adults",
                          "strong": false
                        },
                        {
                          "text": "Knows it ends at about **L3 in neonates**, reaching the adult level by about 1 year",
                          "strong": false
                        },
                        {
                          "text": "Knows the **dural sac ends at S2** in adults (lower, about S3–S4, in neonates)",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:28%\"></th><th style=\"width:36%\">Adult</th><th>Neonate</th></tr>\n        <tr><td class=\"rh\">Upper limit</td><td colspan=\"2\">Continuous with the medulla at the foramen magnum</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Conus medullaris</td><td><b>L1–L2</b> (range T12–L3)</td><td>About <b>L3</b>; adult level by about 1 year</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Dural sac</td><td><b>S2</b> (level of the PSIS)</td><td>About S3–S4</td></tr>\n        <tr><td class=\"rh\">Practical point</td><td>Spinal anaesthesia below L2</td><td>Spinal anaesthesia at L4/5 or below</td></tr>\n      </table>\n      <p><b>Other features:</b> the filum terminale continues to the coccyx; cervical (C4–T1) and lumbosacral (L2–S3) enlargements; 31 pairs of spinal nerves; cauda equina below the conus.</p>"
                    },
                    {
                      "number": "1.2",
                      "prompt": "Describe the cross-sectional anatomy of the spinal cord.",
                      "criteria": [
                        {
                          "text": "Describes the central **H-shaped grey matter** (dorsal, lateral and ventral horns)",
                          "strong": false
                        },
                        {
                          "text": "Describes the surrounding **white matter columns**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<figure class=\"dg\">\n        <svg viewBox=\"0 0 600 300\" width=\"100%\" role=\"img\" aria-label=\"Cross-section of the spinal cord showing grey matter horns and main tracts\">\n          <g font-family=\"'Plus Jakarta Sans',sans-serif\">\n            <ellipse cx=\"300\" cy=\"150\" rx=\"150\" ry=\"112\" fill=\"#FFFAF4\" stroke=\"#7C7068\" stroke-width=\"2\"/>\n            <!-- posterior median sulcus, anterior median fissure -->\n            <line x1=\"300\" y1=\"38\" x2=\"300\" y2=\"60\" stroke=\"#7C7068\" stroke-width=\"2\"/>\n            <path d=\"M296 262 L300 222 L304 262\" fill=\"#fff\" stroke=\"#7C7068\" stroke-width=\"2\"/>\n            <!-- ascending tracts -->\n            <path d=\"M282 140 L252 60 Q300 44 348 60 L318 140 Z\" fill=\"#FBD9CC\" stroke=\"#F0623C\" stroke-width=\"1.5\"/>\n            <ellipse cx=\"190\" cy=\"200\" rx=\"26\" ry=\"19\" fill=\"#FBD9CC\" stroke=\"#F0623C\" stroke-width=\"1.5\"/>\n            <ellipse cx=\"410\" cy=\"200\" rx=\"26\" ry=\"19\" fill=\"#FBD9CC\" stroke=\"#F0623C\" stroke-width=\"1.5\"/>\n            <!-- descending tracts -->\n            <ellipse cx=\"180\" cy=\"128\" rx=\"27\" ry=\"21\" fill=\"#3A2D25\" opacity=\".85\"/>\n            <ellipse cx=\"420\" cy=\"128\" rx=\"27\" ry=\"21\" fill=\"#3A2D25\" opacity=\".85\"/>\n            <ellipse cx=\"284\" cy=\"238\" rx=\"9\" ry=\"15\" fill=\"#3A2D25\" opacity=\".85\"/>\n            <ellipse cx=\"316\" cy=\"238\" rx=\"9\" ry=\"15\" fill=\"#3A2D25\" opacity=\".85\"/>\n            <!-- grey matter -->\n            <g fill=\"#D9CCBF\" stroke=\"#A99E95\" stroke-width=\"1.2\">\n              <path d=\"M300 140 L282 140 L246 70 L232 66 L240 96 L262 146 L238 150 L228 158 L238 160 L258 158 L232 186 L226 212 L262 214 L286 168 L300 166 L314 168 L338 214 L374 212 L368 186 L342 158 L362 160 L372 158 L362 150 L338 146 L360 96 L368 66 L354 70 L318 140 Z\"/>\n            </g>\n            <circle cx=\"300\" cy=\"153\" r=\"4\" fill=\"#fff\" stroke=\"#7C7068\"/>\n            <!-- labels left -->\n            <g font-size=\"11.5\" fill=\"#241B16\">\n              <line x1=\"264\" y1=\"84\" x2=\"214\" y2=\"40\" stroke=\"#F0623C\"/><text x=\"12\" y=\"32\" font-weight=\"700\" fill=\"#D2491F\">Dorsal columns</text><text x=\"12\" y=\"46\" font-size=\"10\" fill=\"#7C7068\">fine touch, vibration, proprioception</text>\n              <line x1=\"156\" y1=\"128\" x2=\"120\" y2=\"110\" stroke=\"#3A2D25\"/><text x=\"12\" y=\"104\" font-weight=\"700\">Lateral corticospinal</text><text x=\"12\" y=\"118\" font-size=\"10\" fill=\"#7C7068\">voluntary motor</text>\n              <line x1=\"166\" y1=\"204\" x2=\"120\" y2=\"214\" stroke=\"#F0623C\"/><text x=\"12\" y=\"210\" font-weight=\"700\" fill=\"#D2491F\">Spinothalamic</text><text x=\"12\" y=\"224\" font-size=\"10\" fill=\"#7C7068\">pain, temperature, crude touch</text>\n              <line x1=\"282\" y1=\"252\" x2=\"160\" y2=\"276\" stroke=\"#3A2D25\"/><text x=\"12\" y=\"280\" font-weight=\"700\">Anterior corticospinal</text><text x=\"12\" y=\"294\" font-size=\"10\" fill=\"#7C7068\">uncrossed motor</text>\n            </g>\n            <!-- labels right -->\n            <g font-size=\"11.5\" fill=\"#241B16\">\n              <line x1=\"358\" y1=\"80\" x2=\"470\" y2=\"56\" stroke=\"#A99E95\"/><text x=\"474\" y=\"52\" font-weight=\"700\">Dorsal horn</text><text x=\"474\" y=\"66\" font-size=\"10\" fill=\"#7C7068\">laminae I–VI, sensory</text>\n              <line x1=\"368\" y1=\"156\" x2=\"470\" y2=\"156\" stroke=\"#A99E95\"/><text x=\"474\" y=\"152\" font-weight=\"700\">Lateral horn</text><text x=\"474\" y=\"166\" font-size=\"10\" fill=\"#7C7068\">T1–L2 sympathetic</text>\n              <line x1=\"356\" y1=\"204\" x2=\"470\" y2=\"236\" stroke=\"#A99E95\"/><text x=\"474\" y=\"234\" font-weight=\"700\">Ventral horn</text><text x=\"474\" y=\"248\" font-size=\"10\" fill=\"#7C7068\">laminae VIII–IX, motor</text>\n            </g>\n            <g font-family=\"'IBM Plex Mono',monospace\" font-size=\"9.5\" fill=\"#7C7068\" letter-spacing=\"1\" text-anchor=\"middle\">\n              <text x=\"300\" y=\"20\">POSTERIOR</text><text x=\"300\" y=\"292\">ANTERIOR</text>\n            </g>\n          </g>\n        </svg>\n        <figcaption>Spinal cord cross-section. Coral: ascending tracts. Dark: descending tracts. Tracts shown on both sides for clarity.</figcaption>\n      </figure>\n      <table class=\"kt\">\n        <tr><th style=\"width:22%\">Rexed lamina</th><th style=\"width:30%\">Name</th><th>Input or function</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">I</td><td>Marginal zone</td><td>Aδ and C nociceptive input; spinothalamic projection neurones</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">II</td><td>Substantia gelatinosa</td><td>C-fibre input; inhibitory and excitatory interneurones (gate control)</td></tr>\n        <tr><td class=\"rh\">III–IV</td><td>Nucleus proprius</td><td>Aβ (touch) input</td></tr>\n        <tr><td class=\"rh\">V</td><td>Neck of dorsal horn</td><td>Wide dynamic range neurones; visceral and somatic convergence</td></tr>\n        <tr><td class=\"rh\">VII</td><td>Intermediate zone</td><td>Intermediolateral cell column (autonomic): T1–L2 sympathetic, S2–S4 parasympathetic</td></tr>\n        <tr><td class=\"rh\">VIII–IX</td><td>Ventral horn</td><td>Motor neurones</td></tr>\n        <tr><td class=\"rh\">X</td><td>Around the central canal</td><td>Visceral input</td></tr>\n      </table>\n      <p><b>White matter:</b> dorsal, lateral and ventral columns (funiculi) carrying the ascending and descending tracts.</p>"
                    },
                    {
                      "number": "1.3",
                      "prompt": "What are the functions of the spinal cord?",
                      "criteria": [
                        {
                          "text": "Describes **conduction** of ascending sensory and descending motor information",
                          "strong": false
                        },
                        {
                          "text": "Describes **reflex** activity (such as stretch and withdrawal reflexes)",
                          "strong": false
                        },
                        {
                          "text": "Describes **autonomic** outflow",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Function</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Conduction</td><td>Ascending sensory tracts to brainstem, cerebellum and thalamus; descending motor and modulatory tracts from the brain</td></tr>\n        <tr><td class=\"rh\">Reflexes</td><td>Monosynaptic stretch reflex; polysynaptic withdrawal and crossed extensor reflexes; central pattern generators for locomotion</td></tr>\n        <tr><td class=\"rh\">Autonomic</td><td>Sympathetic outflow from the lateral horn (T1–L2); sacral parasympathetic outflow (S2–S4) to bladder, bowel and sexual organs</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Sensory processing</td><td>The dorsal horn integrates and modulates nociceptive input: gate control by Aβ input and inhibitory interneurones, descending inhibition and facilitation, central sensitisation</td></tr>\n      </table>"
                    },
                    {
                      "number": "1.4",
                      "prompt": "Describe the main ascending and descending tracts.",
                      "criteria": [
                        {
                          "text": "Describes the **dorsal columns**, their function and decussation",
                          "strong": false
                        },
                        {
                          "text": "Describes the **spinothalamic tract**, its function and decussation",
                          "strong": false
                        },
                        {
                          "text": "Describes the **lateral corticospinal tract**, its function and decussation",
                          "strong": false
                        },
                        {
                          "text": "Names **one other** tract",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:20%\">Tract</th><th style=\"width:28%\">Function</th><th>Course and decussation</th></tr>\n        <tr><td class=\"rh\">Dorsal columns</td><td>Fine touch, vibration, proprioception</td><td>Fasciculus gracilis (medial, lower limb) and cuneatus (lateral, upper limb, above T6). Ascend <b>ipsilaterally</b>; synapse in the gracile and cuneate nuclei; cross in the <b>medulla</b> as internal arcuate fibres; ascend as the medial lemniscus</td></tr>\n        <tr><td class=\"rh\">Spinothalamic</td><td>Lateral: pain and temperature. Anterior: crude touch</td><td>Second-order neurones cross in the <b>anterior white commissure within 1–2 segments</b>. Somatotopy: sacral fibres most lateral</td></tr>\n        <tr><td class=\"rh\">Lateral corticospinal</td><td>Voluntary motor</td><td>85–90% cross at the <b>medullary pyramids</b>, then descend on the same side as the muscles they supply. The anterior corticospinal tract remains uncrossed</td></tr>\n        <tr><td class=\"rh\">Others</td><td colspan=\"2\">Dorsal and ventral spinocerebellar (unconscious proprioception); spinoreticular and spinomesencephalic (affective pain); reticulospinal (including respiratory pathways); rubrospinal, vestibulospinal, tectospinal; Lissauer's tract; descending inhibitory fibres in the dorsolateral funiculus</td></tr>\n      </table>\n      <p><b>Brown-Séquard (hemisection):</b> ipsilateral loss of motor function and dorsal column modalities below the lesion; contralateral loss of pain and temperature from 1–2 segments below.</p>"
                    },
                    {
                      "number": "1.5",
                      "prompt": "Describe the blood supply of the spinal cord, and why it matters in interventional procedures.",
                      "criteria": [
                        {
                          "text": "Describes the arterial supply of the spinal cord",
                          "strong": false
                        },
                        {
                          "text": "Describes reinforcement by **segmental medullary arteries**",
                          "strong": false
                        },
                        {
                          "text": "Describes the **nerve supply of the coverings** (sinuvertebral nerves)",
                          "strong": false
                        },
                        {
                          "text": "Explains the **interventional risk**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:28%\">Vessel</th><th>Supply</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Anterior spinal artery</td><td>One vessel, formed from both vertebral arteries. Supplies the <b>anterior two-thirds</b>, including spinothalamic and corticospinal tracts</td></tr>\n        <tr><td class=\"rh\">Posterior spinal arteries</td><td>Two (from vertebral arteries or PICA). Supply the <b>posterior third</b> (dorsal columns)</td></tr>\n        <tr><td class=\"rh\">Segmental (radicular / medullary) arteries</td><td>Reinforce the longitudinal arteries; from vertebral, ascending cervical, intercostal and lumbar arteries</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Artery of Adamkiewicz</td><td>Enters between T9 and L2 (usually T9–T12, left-sided in about 75%); supplies the lower two-thirds of the cord</td></tr>\n        <tr><td class=\"rh\">Watershed</td><td>Mid-thoracic cord (T4–T8)</td></tr>\n        <tr><td class=\"rh\">Venous drainage</td><td>Valveless epidural (Batson's) plexus</td></tr>\n      </table>\n      <p><b>Nerve supply:</b> the cord has no nociceptive supply. The dura (mainly anterior), posterior longitudinal ligament and outer annulus are supplied by the <b>sinuvertebral (recurrent meningeal) nerves</b>.</p>\n      <ul>\n        <li><b>Transforaminal injection</b> can enter a radicular artery: particulate steroid can embolise and cause <b>anterior spinal artery syndrome</b> (paraplegia, loss of pain and temperature, preserved dorsal columns). Cervical transforaminal injection risks vertebral artery injury and brainstem infarction</li>\n        <li><b>Mitigation:</b> non-particulate dexamethasone, real-time contrast or digital subtraction imaging, local anaesthetic test dose</li>\n        <li><b>Other examples:</b> paraplegia after coeliac plexus neurolysis (spasm or injury of lumbar segmental arteries); hypotension in watershed areas; intravascular injection via the epidural venous plexus; epidural haematoma</li>\n      </ul>"
                    },
                    {
                      "number": "1.6",
                      "prompt": "Describe the anatomy of the caudal space, its volume and its uses.",
                      "criteria": [
                        {
                          "text": "Describes the **sacral hiatus**",
                          "strong": false
                        },
                        {
                          "text": "Lists the **contents** of the caudal space",
                          "strong": false
                        },
                        {
                          "text": "Gives the approximate volume of the caudal space",
                          "strong": false
                        },
                        {
                          "text": "Describes **uses** in children and in chronic pain",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:20%\"></th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Space</td><td>The sacral part of the epidural space, within the sacral canal</td></tr>\n        <tr><td class=\"rh\">Sacral hiatus</td><td>Failure of fusion of the S5 (with or without S4) laminae; bounded by the sacral cornua; covered by the sacrococcygeal ligament. Variable or absent in a minority of adults</td></tr>\n        <tr><td class=\"rh\">Contents</td><td>Sacral and coccygeal nerve roots, filum terminale, epidural venous plexus, fat (loose in children, denser in adults). Dural sac ends at about S2 in adults, lower in infants</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Volume</td><td>Adult sacral canal about <b>10–30 ml</b> (mean about 14 ml)</td></tr>\n      </table>\n      <table class=\"kt\">\n        <tr><th style=\"width:60%\">Paediatric caudal volume (Armitage)</th><th>Block height</th></tr>\n        <tr><td class=\"num\"><b>0.5</b> ml/kg</td><td>Sacral</td></tr>\n        <tr><td class=\"num\"><b>1.0</b> ml/kg</td><td>Lumbar / lower thoracic</td></tr>\n        <tr><td class=\"num\"><b>1.25</b> ml/kg</td><td>Mid-thoracic</td></tr>\n      </table>\n      <ul>\n        <li><b>Children:</b> caudal analgesia for lower abdominal, perineal and lower limb surgery</li>\n        <li><b>Chronic pain:</b> caudal epidural steroid for lumbosacral radicular pain, especially after lumbar surgery when interlaminar access is difficult; epidural adhesiolysis and epiduroscopy</li>\n        <li><b>Safety:</b> ultrasound or fluoroscopy improves accuracy. Risks include intravascular, intraosseous or subarachnoid injection</li>\n      </ul>"
                    },
                    {
                      "number": "1.7",
                      "prompt": "Which interventional procedures target the spinal cord?",
                      "criteria": [
                        {
                          "text": "Names **neuromodulation** procedures",
                          "strong": false
                        },
                        {
                          "text": "Names **ablative** procedures",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:18%\"></th><th style=\"width:30%\">Procedure</th><th>Target</th></tr>\n        <tr><td class=\"rh\" rowspan=\"3\">Neuromodulation</td><td>Spinal cord stimulation</td><td>Dorsal columns: Aβ fibres activate dorsal horn inhibitory interneurones and supraspinal descending inhibition</td></tr>\n        <tr><td>Dorsal root ganglion stimulation</td><td>Adjacent target, for focal pain</td></tr>\n        <tr><td>Intrathecal drug delivery</td><td>Chemical neuromodulation in the dorsal horn: morphine, ziconotide, baclofen</td></tr>\n        <tr><td class=\"rh\" rowspan=\"5\">Ablative</td><td>Percutaneous cervical cordotomy</td><td>Lateral spinothalamic tract at C1/2, contralateral to the pain</td></tr>\n        <tr><td>Midline myelotomy</td><td>Postsynaptic dorsal column visceral pain pathway</td></tr>\n        <tr><td>DREZ lesioning</td><td><b>Dorsal root entry zone</b>, such as brachial plexus avulsion or Pancoast tumour</td></tr>\n        <tr><td>Intrathecal neurolysis (phenol, alcohol)</td><td>Dorsal roots, such as a saddle block</td></tr>\n        <tr><td>Dorsal rhizotomy; trigeminal tractotomy</td><td>Dorsal roots; descending trigeminal tract</td></tr>\n      </table>"
                    }
                  ]
                },
                {
                  "key": "q2",
                  "label": "Question 2",
                  "kind": "clinsci",
                  "timerMinutes": 7.5,
                  "subtitle": "Physiology — Central sensitisation",
                  "questions": [
                    {
                      "number": "2.1",
                      "prompt": "What is central sensitisation, and how might it present clinically?",
                      "criteria": [
                        {
                          "text": "Gives the **IASP definition**",
                          "strong": false
                        },
                        {
                          "text": "Describes the **clinical features**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>IASP definition:</b> increased responsiveness of nociceptive neurones in the central nervous system to their normal or subthreshold afferent input. Clinically, a \"gain amplification\" of neural signalling that produces pain hypersensitivity.</p>\n      <ul>\n        <li><b>Clinical features:</b> dynamic tactile allodynia, temporal summation, secondary hyperalgesia around an injury, pain persisting without an obvious peripheral cause</li>\n        <li><b>Woolf (1983):</b> after repeated C-fibre stimulation in rats, dorsal horn neurones became hyperexcitable to noxious input, responded to innocuous touch (Aβ input) and had expanded receptive fields. Local anaesthetic at the periphery did not reverse this, showing the change was central</li>\n        <li><b>Not only spinal:</b> also seen in the thalamus, amygdala, anterior cingulate cortex, PAG and prefrontal cortex</li>\n      </ul>"
                    },
                    {
                      "number": "2.2",
                      "prompt": "What is the difference between wind-up, central sensitisation and long-term potentiation?",
                      "criteria": [
                        {
                          "text": "Describes **wind-up**",
                          "strong": false
                        },
                        {
                          "text": "Describes **central sensitisation**",
                          "strong": false
                        },
                        {
                          "text": "Knows all are **NMDA receptor-dependent**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:22%\"></th><th style=\"width:44%\">What happens</th><th>Duration and type</th></tr>\n        <tr><td class=\"rh\">Wind-up</td><td>Progressive increase in dorsal horn neurone firing during repetitive low-frequency C-fibre stimulation. Clinical correlate: <b>temporal summation</b></td><td>Short-term; <b>homosynaptic</b>; returns to baseline when stimulation stops</td></tr>\n        <tr><td class=\"rh\">Central sensitisation</td><td>Activity in C fibres changes the response to <b>other</b> inputs (such as Aβ fibres producing allodynia); can occur with or without wind-up</td><td>Longer-lasting; <b>heterosynaptic</b></td></tr>\n        <tr><td class=\"rh\">Long-term potentiation</td><td>Persistent strengthening of synaptic transmission at nociceptive synapses (\"molecular memory\"); implicated in hyperalgesia and opioid-induced hyperalgesia</td><td>Persistent</td></tr>\n      </table>\n      <p>All depend on <b>NMDA receptor activation</b>, which is the rationale for ketamine.</p>"
                    },
                    {
                      "number": "2.3",
                      "prompt": "Describe the cellular mechanisms of central sensitisation.",
                      "criteria": [
                        {
                          "text": "Describes **induction** at the NMDA receptor (glutamate, AMPA, removal of the Mg²⁺ block)",
                          "strong": false
                        },
                        {
                          "text": "Describes the **enzymatic and genomic** changes that maintain sensitisation",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Induction</span>Intense C-fibre activity releases <b>glutamate</b>; AMPA activation depolarises the neurone</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">NMDA</span>Voltage-dependent <b>Mg²⁺ block removed</b>; Ca²⁺ enters. CGRP and BDNF amplify the rise</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Enzymatic</span>Ca²⁺ activates PKC and CaMKII, which phosphorylate AMPA and NMDA receptors and insert new ones</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Genomic</span>CREB and NF-κB change gene expression: more receptors, channels and synapses, lasting weeks to months</div>\n      </div>\n      <p><b>Circuit changes:</b> Aβ (touch) input reaches nociceptive projection neurones in lamina I through normally silent polysynaptic pathways unmasked by loss of inhibition. This produces dynamic mechanical allodynia.</p>"
                    },
                    {
                      "number": "2.4",
                      "prompt": "What disinhibitory mechanisms contribute to central sensitisation?",
                      "criteria": [
                        {
                          "text": "Describes **loss of descending inhibition**",
                          "strong": false
                        },
                        {
                          "text": "Mentions one other disinhibitory mechanism",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:26%\">Mechanism</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Reduced inhibitory transmission</td><td>Apoptosis of GABAergic interneurones after nerve injury; reduced GABA synthesis (glutamate decarboxylase); microglial removal of inhibitory synapses</td></tr>\n        <tr><td class=\"rh\">Glycine receptor</td><td>PGE2 acts via EP2 receptors and PKA to phosphorylate the α3 subunit of glycine receptors in the superficial dorsal horn, reducing glycinergic inhibition</td></tr>\n        <tr><td class=\"rh\">Chloride homeostasis</td><td>KCC2 (chloride exporter) down and NKCC1 (importer) up, so intracellular chloride rises and GABA and glycine hyperpolarise less, or even depolarise</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Descending control</td><td>More ON-cell and less OFF-cell activity in the RVM; reduced noradrenergic α2 inhibition; enhanced 5-HT3 facilitation after nerve injury; reduced supraspinal µ-opioid signalling in neuropathic pain</td></tr>\n      </table>"
                    },
                    {
                      "number": "2.5",
                      "prompt": "How can central sensitisation be assessed in a patient?",
                      "criteria": [
                        {
                          "text": "Describes **bedside tests**",
                          "strong": false
                        },
                        {
                          "text": "Mentions **quantitative sensory testing**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:26%\"></th><th>Tests</th></tr>\n        <tr><td class=\"rh\">Bedside</td><td>Dynamic mechanical allodynia with a brush; pinprick hyperalgesia extending beyond the injured area (secondary hyperalgesia); temporal summation with repeated pinprick; painful after-sensations; widespread pressure pain hypersensitivity</td></tr>\n        <tr><td class=\"rh\">Quantitative sensory testing</td><td>Lowered pressure and thermal pain thresholds; enhanced temporal summation. <b>Conditioned pain modulation</b> tests descending inhibition, which is reduced in many chronic pain states</td></tr>\n      </table>"
                    },
                    {
                      "number": "2.6",
                      "prompt": "What is the role of microglia in central sensitisation?",
                      "criteria": [
                        {
                          "text": "Understands the role of **microglia** in sensitisation",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Resting</span>Ramified (M2-like); secrete anti-inflammatory IL-10 and TGF-β</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Trigger</span>Nerve injury or inflammation: ATP via purinergic receptors (P2X4), chemokines</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Activated</span>Amoeboid (M1); release IL-1β, IL-6, TNF-α, CCL2 and <b>BDNF</b></div>\n      </div>\n      <ul>\n        <li><b>Cytokines</b> increase excitation and reduce inhibition</li>\n        <li><b>BDNF</b> acts on neuronal TrkB receptors to downregulate <b>KCC2</b>, linking microglia to disinhibition</li>\n        <li><b>Minocycline</b> (non-specific microglial inhibitor) prevents hypersensitivity developing in animals, but clinical trials have been inconclusive</li>\n      </ul>"
                    }
                  ]
                },
                {
                  "key": "q3",
                  "label": "Question 3",
                  "kind": "clinsci",
                  "timerMinutes": 7.5,
                  "subtitle": "Pharmacology — Ketamine and ketamine uropathy",
                  "questions": [
                    {
                      "number": "3.1",
                      "prompt": "Describe the structure and physicochemical properties of ketamine.",
                      "criteria": [
                        {
                          "text": "Knows it is a **phencyclidine derivative**",
                          "strong": false
                        },
                        {
                          "text": "Knows it is a **racemic mixture**",
                          "strong": false
                        },
                        {
                          "text": "Knows the differences between **S and R ketamine**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:26%\">Property</th><th>Detail</th></tr>\n        <tr><td class=\"rh\">Structure</td><td>Phencyclidine derivative (2-(o-chlorophenyl)-2-methylamino cyclohexanone); molecular weight 238</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Isomers</td><td>One chiral centre: <b>racemic</b> mixture of S(+) and R(–). <b>S(+)-ketamine</b> has 3–4 times greater NMDA affinity, is about twice as potent as the racemate, and gives faster recovery with fewer psychological effects. Esketamine nasal spray is used for treatment-resistant depression</td></tr>\n        <tr><td class=\"rh\">Presentation</td><td>Water soluble; acidic solution (pH 3.5–5.5) at 10, 50 and 100 mg/ml, with preservative</td></tr>\n        <tr><td class=\"rh\">pKa and lipid solubility</td><td>pKa 7.5; highly lipid soluble (5–10 times thiopental), so it crosses the blood–brain barrier rapidly</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.2",
                      "prompt": "What is its mechanism of action?",
                      "criteria": [
                        {
                          "text": "Describes **NMDA receptor antagonism**",
                          "strong": false
                        },
                        {
                          "text": "Mentions **other actions**",
                          "strong": false
                        },
                        {
                          "text": "Links NMDA antagonism to **anti-hyperalgesia and prevention of central sensitisation**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>NMDA receptor:</b> non-competitive antagonist binding the phencyclidine site within the open channel pore (use-dependent); also reduces presynaptic glutamate release. Produces anaesthesia and analgesia in brain and spinal cord</li>\n        <li><b>Other actions:</b> weak µ and κ opioid interaction (about 10 times lower affinity; naloxone does not reverse analgesia); monoamine reuptake inhibition enhancing descending inhibition; muscarinic and nicotinic antagonism (tachycardia, bronchodilation); sodium channel block (local anaesthetic effect at high doses)</li>\n        <li><b>Clinical link:</b> NMDA blockade prevents wind-up and central sensitisation, giving anti-hyperalgesic and opioid-sparing effects and reducing opioid tolerance and opioid-induced hyperalgesia</li>\n      </ul>"
                    },
                    {
                      "number": "3.3",
                      "prompt": "Describe its pharmacokinetics.",
                      "criteria": [
                        {
                          "text": "Gives **bioavailability** by route",
                          "strong": false
                        },
                        {
                          "text": "Describes **metabolism**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:30%\">Route</th><th>Bioavailability</th></tr>\n        <tr><td class=\"rh\">Intramuscular</td><td class=\"num\">93%</td></tr>\n        <tr><td class=\"rh\">Intranasal</td><td class=\"num\">25–50%</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Oral</td><td><span class=\"num\" style=\"font-family:var(--mono)\">20–25%</span> (extensive first-pass metabolism, so relatively more norketamine)</td></tr>\n      </table>\n      <table class=\"kt\">\n        <tr><th style=\"width:30%\">Parameter</th><th>Value</th></tr>\n        <tr><td class=\"rh\">Onset (IV)</td><td>About 30 seconds</td></tr>\n        <tr><td class=\"rh\">Volume of distribution</td><td>About 3 l/kg</td></tr>\n        <tr><td class=\"rh\">Protein binding</td><td>20–50%</td></tr>\n        <tr><td class=\"rh\">Half-lives</td><td>Distribution about 10 minutes; elimination 2–3 hours</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Metabolism</td><td>Hepatic CYP3A4 and CYP2B6: N-demethylation to <b>norketamine</b> (20–30% of ketamine's activity), then hydroxylation to hydroxynorketamine and dehydronorketamine; conjugated and excreted in urine</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.4",
                      "prompt": "What are its effects on the body systems, and its side effects?",
                      "criteria": [
                        {
                          "text": "Describes the **CNS** effects",
                          "strong": false
                        },
                        {
                          "text": "Describes **cardiovascular** effects",
                          "strong": false
                        },
                        {
                          "text": "Describes **respiratory** effects",
                          "strong": false
                        },
                        {
                          "text": "Mentions one other effect",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:20%\">System</th><th>Effects</th></tr>\n        <tr><td class=\"rh\">CNS</td><td>Dissociation between thalamo-neocortical and limbic systems; catalepsy with eyes open and nystagmus; analgesia at much lower concentrations than anaesthesia. <b>Emergence phenomena</b> (vivid dreams, illusions, delirium) in about 5–30%, more with older age, female sex, rapid IV injection and large doses; reduced by benzodiazepines. Increases cerebral blood flow and metabolism (ICP concerns debated)</td></tr>\n        <tr><td class=\"rh\">Cardiovascular</td><td>Tachycardia, hypertension and increased cardiac output from central sympathetic stimulation; direct myocardial depression unmasked when catecholamines are depleted</td></tr>\n        <tr><td class=\"rh\">Respiratory</td><td>Minimal depression of drive; <b>bronchodilation</b> (useful in asthma); airway reflexes relatively preserved, but aspiration possible; increased salivation (antisialagogue such as glycopyrrolate)</td></tr>\n        <tr><td class=\"rh\">Other</td><td>Raised intraocular pressure, increased muscle tone, nausea and vomiting, lacrimation</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.5",
                      "prompt": "How is ketamine used in pain medicine, and what are the concerns with long-term use?",
                      "criteria": [
                        {
                          "text": "Describes use in **acute pain**",
                          "strong": false
                        },
                        {
                          "text": "Describes use in **chronic pain**",
                          "strong": false
                        },
                        {
                          "text": "Names long-term harms",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:22%\">Setting</th><th>Use</th></tr>\n        <tr><td class=\"rh\">Perioperative</td><td>Low dose (such as 0.1–0.5 mg/kg bolus with or without infusion): reduces opioid requirements and PONV; useful in opioid-tolerant patients and those at risk of persistent post-surgical pain</td></tr>\n        <tr><td class=\"rh\">Chronic pain</td><td>IV infusions for CRPS and refractory neuropathic pain (short-term benefit in small RCTs); oral ketamine in specialist settings</td></tr>\n        <tr><td class=\"rh\">Cancer pain</td><td>Evidence mixed; an RCT of subcutaneous ketamine in cancer pain was negative</td></tr>\n      </table>\n      <ul>\n        <li><b>Long-term harms:</b> psychotomimetic effects, tolerance, misuse and dependence, cognitive impairment, hepatotoxicity (cholestasis, biliary dilatation, \"K-cramps\" abdominal pain) and <b>ketamine uropathy</b></li>\n        <li><b>UK status:</b> Class B controlled drug (reclassified from Class C in 2014), Schedule 2</li>\n      </ul>"
                    },
                    {
                      "number": "3.6",
                      "prompt": "A ketamine user presents with dysuria, frequency and suprapubic pain. What is the diagnosis, and what features support it?",
                      "criteria": [
                        {
                          "text": "Diagnoses **ketamine-induced uropathy**",
                          "strong": false
                        },
                        {
                          "text": "Describes supporting features",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<p><b>Ketamine-induced cystitis (ketamine uropathy).</b></p>\n      <ul>\n        <li><b>History:</b> recreational ketamine use</li>\n        <li><b>Lower urinary tract symptoms:</b> frequency, urgency, dysuria, nocturia, haematuria; suprapubic pain</li>\n        <li><b>Investigations:</b> sterile pyuria (non-bacterial inflammation); eosinophilia</li>\n        <li><b>Hydronephrosis</b> indicates ureteric involvement. Ureteric involvement and bladder wall thickening are more typical of ketamine uropathy than of interstitial cystitis / bladder pain syndrome</li>\n      </ul>"
                    },
                    {
                      "number": "3.7",
                      "prompt": "What is the pathophysiology of ketamine uropathy, and how is it staged?",
                      "criteria": [
                        {
                          "text": "Describes the **pathophysiology** of ketamine uropathy",
                          "strong": false
                        },
                        {
                          "text": "Describes the **three stages** and why staging matters",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<div class=\"flow\">\n        <div class=\"st\"><span class=\"k\">Urothelial toxicity</span>Ketamine and metabolites in urine destroy the urothelium; chronic inflammation with eosinophils and mast cells; severity tracks dose</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st\"><span class=\"k\">Barrier loss</span><b>Glycosaminoglycan (GAG) layer</b> disrupted, so urinary solutes penetrate; nerve hyperplasia in the lamina propria drives severe pain</div>\n        <div class=\"ar\">→</div>\n        <div class=\"st out\"><span class=\"k\">Progression</span>Wall thickening, fibrosis, contracture; ureteric inflammation, hydronephrosis, renal impairment</div>\n      </div>\n      <table class=\"kt\">\n        <tr><th style=\"width:14%\">Stage</th><th style=\"width:40%\">Features</th><th>Management</th></tr>\n        <tr><td class=\"rh\">1</td><td>Inflammatory; normal ureters and renal function</td><td>May improve with cessation, bladder training and oral treatment</td></tr>\n        <tr><td class=\"rh\">2</td><td>Structural: wall thickening, fibrosis, reduced capacity; renal function preserved</td><td>Intravesical instillations; intradetrusor botulinum toxin A</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">3</td><td>Contracted bladder, hydronephrosis, renal decompensation</td><td>Augmentation cystoplasty or urinary diversion, with or without cystectomy</td></tr>\n      </table>"
                    },
                    {
                      "number": "3.8",
                      "prompt": "How would you manage this patient?",
                      "criteria": [
                        {
                          "text": "Identifies **complete cessation of ketamine** as the most important treatment",
                          "strong": false
                        },
                        {
                          "text": "Provides **substance misuse and psychological support**",
                          "strong": false
                        },
                        {
                          "text": "Describes **treatments for ketamine uropathy**",
                          "strong": false
                        },
                        {
                          "text": "Refers to **urology** for advanced disease",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:24%\">Step</th><th>Detail</th></tr>\n        <tr class=\"hi\"><td class=\"rh\">Stop ketamine</td><td>May reverse symptoms in early disease (improvement in about half). Withdrawal is physically safe, but cravings and psychological dependence are common; mild disease may allow tapering over several days</td></tr>\n        <tr><td class=\"rh\">Support</td><td>Substance misuse services, psychological and social support; ongoing bladder pain may drive further ketamine use</td></tr>\n        <tr><td class=\"rh\">Analgesia and symptoms</td><td>Paracetamol and NSAIDs if appropriate; anticholinergics (such as solifenacin) for urgency and frequency; amitriptyline, pregabalin or gabapentin for a neuropathic component; avoid escalating opioids</td></tr>\n        <tr><td class=\"rh\">Bladder-specific</td><td>Pentosan polysulfate to restore the GAG layer; intravesical instillations; intradetrusor botulinum toxin A</td></tr>\n        <tr><td class=\"rh\">Urology</td><td>Advanced disease: augmentation cystoplasty or diversion. Monitor renal function and upper tracts</td></tr>\n      </table>"
                    }
                  ]
                },
                {
                  "key": "q4",
                  "label": "Question 4",
                  "kind": "clinsci",
                  "timerMinutes": 7.5,
                  "subtitle": "Clinical science — Pain management programmes",
                  "questions": [
                    {
                      "number": "4.1",
                      "prompt": "What is a pain management programme, and who is it for?",
                      "criteria": [
                        {
                          "text": "Describes a **group-based, interdisciplinary** programme based on **cognitive behavioural principles**",
                          "strong": false
                        },
                        {
                          "text": "States PMPs are for persistent pain with **significant impact on physical, psychological and social function**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Definition:</b> a programme of care, usually delivered to groups, that promotes behaviour change and improves wellbeing in people with pain, using cognitive behavioural principles, skills training, exercise and education</li>\n        <li><b>Who for:</b> people with persistent pain that adversely affects quality of life, with significant impact on physical, psychological and social function</li>\n        <li><b>Standards:</b> the FPM Core Standards (adopting the British Pain Society Guidelines for Pain Management Programmes for Adults) recommend PMPs as the treatment of choice for this group</li>\n        <li><b>Aim:</b> to improve participation in daily activities, reduce distress and improve quality of life, <b>not</b> to eliminate pain</li>\n      </ul>"
                    },
                    {
                      "number": "4.2",
                      "prompt": "Who should be on the PMP team?",
                      "criteria": [
                        {
                          "text": "Names the core **interdisciplinary** professions",
                          "strong": false
                        },
                        {
                          "text": "Mentions **pharmacist** access and support staff",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:30%\">Team member</th><th>Notes</th></tr>\n        <tr><td class=\"rh\">Doctor</td><td>Usually a pain medicine specialist with FFPMRCA or equivalent</td></tr>\n        <tr><td class=\"rh\">Psychologist</td><td>Core member</td></tr>\n        <tr><td class=\"rh\">Physiotherapist</td><td>Core member</td></tr>\n        <tr><td class=\"rh\">Occupational therapist</td><td>Core member</td></tr>\n        <tr><td class=\"rh\">Nurse</td><td>Core member</td></tr>\n        <tr><td class=\"rh\">Pharmacist</td><td>Named pharmacist available in some services</td></tr>\n        <tr><td class=\"rh\">Support staff</td><td>Clinical support workers and an administrator</td></tr>\n      </table>\n      <p>The team shares some competencies and keeps others profession-specific. Staff must be trained and have time in job plans for MDT meetings and CPD.</p>"
                    },
                    {
                      "number": "4.3",
                      "prompt": "What are the components of a PMP?",
                      "criteria": [
                        {
                          "text": "Names **physical** (physiotherapy-based) components",
                          "strong": false
                        },
                        {
                          "text": "Mentions **psychological** principles",
                          "strong": false
                        },
                        {
                          "text": "Names **skills training**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:20%\">Component</th><th>Content</th></tr>\n        <tr><td class=\"rh\">Physical</td><td>Exercise and mindful movement to increase willingness to move and improve fitness; <b>graded activation</b> guided by participant goals (goal setting, identifying barriers, practising skills)</td></tr>\n        <tr><td class=\"rh\">Psychological</td><td><b>Cognitive therapy</b> to examine unhelpful thoughts and beliefs about pain; <b>graded exposure</b> to reduce fear and avoidance; acceptance, mindfulness and psychological flexibility methods (<b>ACT</b>)</td></tr>\n        <tr><td class=\"rh\">Skills training</td><td>Pacing and activity scheduling, goal planning, communication, sleep management, relaxation and breathing, generalising skills to daily life, managing flare-ups and setbacks</td></tr>\n        <tr><td class=\"rh\">Education</td><td>Pain reconceptualisation, pain psychology, safety of activity, medication use, general health (weight, alcohol, smoking). Education alone does not change behaviour</td></tr>\n        <tr><td class=\"rh\">Work</td><td>Work retention and return to work</td></tr>\n      </table>"
                    },
                    {
                      "number": "4.4",
                      "prompt": "How long should a PMP be, and what levels of pain rehabilitation are there?",
                      "criteria": [
                        {
                          "text": "Knows the duration of a **standard** PMP",
                          "strong": false
                        },
                        {
                          "text": "Knows the duration of an **intensive** PMP",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<table class=\"kt\">\n        <tr><th style=\"width:26%\">Level</th><th style=\"width:34%\">Format</th><th>For whom</th></tr>\n        <tr><td class=\"rh\">Early stratified care</td><td>Low-intensity, psychologically informed interventions by trained non-specialist staff</td><td>Risk-stratified, earlier in the pathway</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Standard PMP</td><td>Minimum <b>12 half-day sessions</b> (such as 12 × 3 hours = 36 hours) for commissioning purposes</td><td>Most people with persistent, disabling pain</td></tr>\n        <tr class=\"hi\"><td class=\"rh\">Intensive PMP</td><td>Such as <b>15–20 full days</b>, outpatient or residential</td><td>Very disabled and distressed people unlikely to benefit from a standard programme</td></tr>\n      </table>\n      <p>Longer programmes give greater and more lasting benefit but are not needed for everyone. Individual psychology or physiotherapy may be needed before, during or after a PMP.</p>"
                    },
                    {
                      "number": "4.5",
                      "prompt": "How do you decide whether someone is suitable for a PMP?",
                      "criteria": [
                        {
                          "text": "Bases suitability on the **impact of pain**",
                          "strong": false
                        },
                        {
                          "text": "Knows there must be **no discrimination**",
                          "strong": false
                        },
                        {
                          "text": "Mentions **assessment before enrolment**",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Suitability</b> is based on the impact of pain on function, mood and quality of life</li>\n        <li><b>No discrimination</b> on the basis of age, language spoken, literacy, <b>litigation</b> or a judgement of <b>motivation</b>. Individual delivery should be available when group format is not possible</li>\n        <li><b>Assess before enrolment</b> and offer interventions that enable participation, such as treating severe untreated mental illness or substance misuse, or individual work first. An \"opt-in\" model may improve engagement</li>\n      </ul>"
                    },
                    {
                      "number": "4.6",
                      "prompt": "What is the evidence for PMPs?",
                      "criteria": [
                        {
                          "text": "Knows there is **high-level evidence** for PMPs",
                          "strong": false
                        },
                        {
                          "text": "Names outcomes improved",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>High-level evidence</b> (systematic reviews; Cochrane review of psychological therapies) for both outpatient and residential PMPs</li>\n        <li><b>Outcomes improved:</b> distress and disability reduced; coping and physical function improved</li>\n        <li><b>Wider benefits:</b> better return to work when vocational training is included; fewer consultations; less medication (including opioid reduction); fewer primary care and emergency presentations and onward referrals; cost-effective</li>\n        <li><b>Gaps:</b> the optimum composition of PMPs, and how to improve receptivity</li>\n      </ul>"
                    },
                    {
                      "number": "4.7",
                      "prompt": "What standards should a PMP service meet?",
                      "criteria": [
                        {
                          "text": "Mentions at least **three** standards",
                          "strong": false
                        }
                      ],
                      "knowledgeHtml": "<ul>\n        <li><b>Access:</b> timely access to all forms of pain rehabilitation; standard and intensive programmes in group format, and individually when required</li>\n        <li><b>Quality:</b> evidence-based therapies, delivered by trained interdisciplinary staff adhering to core principles, in primary, secondary or tertiary settings</li>\n        <li><b>Resources:</b> properly resourced with time, personnel and facilities; time in job plans for MDT meetings; funding for training and CPD</li>\n        <li><b>Evaluation:</b> routine outcome measurement; cooperation between primary, secondary and tertiary care</li>\n      </ul>"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
