import { ChromaClient } from "chromadb"
import { useEffect, useState } from "react"
import { env } from "chromadb-default-embed"
import './app.css'

env.useBrowserCache = false
env.allowLocalModels = false

const mockMovies = [
  {
    "title": "The Chronos Gambit",
    "tags": ["Sci-Fi", "Thriller", "Time Travel"],
    "synopsis": "In a bleak, near-future world grappling with the fallout of the 'Temporal Singularity'—a disastrous 2042 event that fractured the timeline—Dr. Aris Thorne, a disgraced physicist living in isolation, discovers a critical flaw in the very fabric of linear time. His old colleague and new nemesis, the ruthless oligarch Elias Vance, is systematically exploiting this flaw using a clandestine, unstable device known as the 'Chronos Engine' to rewrite history in his favor, accumulating unimaginable wealth and political power. Thorne must covertly recruit a team of specialists—a cynical former intelligence agent, a brilliant but erratic coder, and a philosopher who understands the true, terrifying cost of temporal paradox—to execute a seemingly impossible mission: a surgical, one-way jump back to the moment just before the Singularity. The team's objective isn't to prevent the disaster, which they know is fixed, but to plant a unique, encrypted algorithm into the nascent Chronos Engine's core, causing a cascading failure that will neutralize Vance's future manipulation. Their challenge is magnified by the 'Time Wraiths,' temporal police operating outside of linear jurisdiction, who view any attempt to stabilize the timeline as a capital offense, forcing Thorne and his crew to evade pursuit across splintered echoes of their own past, culminating in a pulse-pounding, high-stakes confrontation where the stakes are not just their lives, but the very coherence of reality."
  },
  {
    "title": "Neon Serenade",
    "tags": ["Neo-Noir", "Cyberpunk", "Mystery"],
    "synopsis": "Set in the perpetually rainy, vertically-layered megacity of Neo-Kyoto, a world choked by corporate smog and lit only by garish, holographic advertisements, 'Neon Serenade' follows Kaito 'Raze' Ishikawa, a retired and weary 'Ghost Driver'—a pilot specializing in high-speed, untraceable data-courier runs. Raze's quiet life of cheap ramen and synthetic jazz is shattered when a beautiful, cryptic client named 'Echo' hires him for a seemingly simple job: retrieve a stolen piece of obsolete analogue data—a physical vinyl record rumored to contain the final, unreleased serenade of the city's legendary, long-dead digital musician, 'Vox.' This data, however, is far from mundane; it's the key to unlocking a vast, forgotten conspiracy that links the megacity's ruling consortium, 'OmniCorp,' to the musician's mysterious vanishing a decade prior. As Raze navigates the treacherous underbelly of Neo-Kyoto's stacked districts, from the grimy, bio-luminescent slums to the glittering, impenetrable corporate spires, he finds himself caught between OmniCorp's relentless security forces, rival hacker gangs seeking the powerful secrets on the disc, and his own rekindled sense of purpose. The film is a stylish descent into a world where memory is currency, identity is fluid, and the only certainty is the melancholic drip of the rain and the haunting, digital-analog melody that promises either salvation or total oblivion."
  },
  {
    "title": "The Whisperwood Curse",
    "tags": ["Supernatural Horror", "Folk Tale", "Survival"],
    "synopsis": "After their city-dwelling family inherits a dilapidated, centuries-old cabin deep within the secluded, infamous Whisperwood Forest, the Miller family—a skeptical historian, his pragmatic wife, and their two teenage children—decide to spend a summer renovating the property, hoping to reconnect and escape the modern world. They quickly discover that the isolated, fog-shrouded woods are not merely dense with trees, but thick with a suffocating, ancient folklore. Locals whisper of the 'Hollow Man,' a spectral entity bound to the land by a brutal, forgotten ritual, preying on those who ignore the old ways. As strange occurrences escalate—disembodied, chilling whispers that only the children can hear, unsettling geometric carvings appearing overnight on the cabin walls, and a pervasive, unnatural silence broken only by the snap of twigs where nothing stands—the historian realizes the forest itself is a living prison designed to sustain the curse. The family's attempt to flee is thwarted by the supernatural geography of the wood, which twists paths, warps time, and projects terrifying, personalized illusions designed to break their sanity. They are forced to delve into the cabin's dark history, piecing together fragments of a diary left by a previous, vanished occupant, racing against a full moon deadline to perform a counter-ritual, a harrowing, moral-compromising task that might only transfer the curse's burden, but offers the only hope of escaping the Whisperwood's terrifying embrace before they, too, become part of its grim legend."
  },
  {
    "title": "Ironclad Diplomat",
    "tags": ["Action", "Espionage", "Political Thriller"],
    "synopsis": "When a seemingly unassailable peace treaty between two global superpowers is suddenly jeopardized by the assassination of a key, neutral mediator during a high-profile summit in the neutral zone city of Valerius, veteran UN diplomat Evelyn 'The Brick' Reed is immediately deployed. Known for her unyielding demeanor and ability to negotiate hostile territories, Reed's mission is deceptively simple: locate the sole surviving witness—a young, traumatized technician who accidentally recorded the entire event—and escort her safely to the International Court of Justice before the delicate global balance collapses into full-scale conflict. However, Reed quickly discovers that the assassination was not the work of a rogue terrorist group, but the opening move in a sophisticated, multi-national conspiracy involving shadow agents from both supposed allies, intent on manufacturing a war for profit and political control. She must transform from a negotiator into a frontline operative, utilizing her unexpected training in close-quarters combat and her extensive network of contacts, both legitimate and highly illicit. Pursued through the labyrinthine streets, soaring skyscrapers, and forgotten subterranean bunkers of Valerius by elite special forces and her own compromised security detail, Reed engages in a thrilling, desperate game of cat-and-mouse. The film builds to a tense finale where the truth must be exposed not just through diplomatic channels, but through a brutal, hand-to-hand fight for survival against a highly skilled operative, with the fate of millions resting on the integrity of a single digital file and Reed's unwavering moral fortitude."
  },
  {
    "title": "The Ballad of Dusty Road",
    "tags": ["Western", "Drama", "Revisionist"],
    "synopsis": "Set a decade after the American Civil War, in the scorched, lawless territories of the New Mexico frontier, 'The Ballad of Dusty Road' chronicles the reluctant legend of Silas 'Dusty' Road, a former Union scout haunted by the brutal decisions he made during the war and now seeking a quiet, anonymous existence as a ranch hand. His peace is violently interrupted when the small, struggling town that harbors him becomes the target of the notorious, sadistic cattle baron, Colonel Jedidiah Kaine, a man who views the land and the people on it as his personal property. When Kaine’s men commit a final, unforgivable atrocity against the townsfolk, Silas is forced to retrieve his long-buried firearms and confront his past, becoming the reluctant champion the people never asked for. However, this isn't a story of a flawless hero; Silas is deeply flawed, his methods are pragmatic and often morally ambiguous, and the trauma of his history threatens to overwhelm him at every turn. The film explores the harsh reality of frontier justice, the deep-seated corruption that follows the promise of civilization, and the thin line between a necessary violence and a vengeful one. The climax is not a clean, honorable duel, but a messy, rain-soaked confrontation where Silas must leverage his intelligence and survival skills against Kaine's superior firepower, culminating in a showdown that permanently cements Silas's reputation, but leaves him with a profound understanding that some roads lead only to solitude."
  },
  {
    "title": "Celestial Cartographers",
    "tags": ["Fantasy", "Adventure", "Epic"],
    "synopsis": "In the vibrant, sky-dwelling Kingdom of Aethoria, where cities float on currents of crystallized air and the sun is worshipped as a tangible deity, the ancient art of Celestial Cartography—the practice of mapping the migratory paths of the colossal, mana-rich Sky-Whales that sustain the kingdom’s power—is dying. Elara, a young, brilliant apprentice cartographer from the marginalized Low-Cloud district, discovers a discrepancy in the sacred, centuries-old star charts, hinting at a hidden, fourth migratory path known as 'The Void Current.' This path, if real, holds the key to saving Aethoria’s failing mana reserves, but is dismissed as heresy by the entrenched, power-hungry High Council, who prefer to maintain their control through scarcity. Armed only with her deceased mentor’s cryptic notes, a rickety, hand-built dirigible, and the companionship of a cynical, grounded Sky-Whale tracker, Elara embarks on a forbidden journey into the perilous, storm-lashed territories beyond the kingdom’s protective aura. Their adventure is a dazzling, dangerous odyssey through undiscovered celestial phenomena, encountering sky-pirates, ancient, silent ruins of a forgotten civilization, and mythical, territorial airborne creatures. The true revelation is that The Void Current leads not to more mana, but to a devastating truth about Aethoria’s founding, and a moral choice: save her people by perpetuating a lie, or reveal the dangerous, world-altering truth that could fundamentally change the balance of power across all the floating kingdoms, a decision that forces Elara to redefine the very meaning of 'map' and 'home.'"
  },
  {
    "title": "Zero-Sum Zero",
    "tags": ["Heist", "Comedy", "Crime"],
    "synopsis": "Leo 'The Leverage' Black, a disgraced, over-the-hill former professional gambler renowned for his meticulously planned, mathematically-driven heists, is forced back into the game when his estranged, younger, and equally brilliant rival, 'The Ghost' (who specializes in digital, un-tracable thefts), humiliates him publicly by stealing his last remaining possession: an extremely rare, signed first edition of a seminal work on game theory. To reclaim his property and his reputation, Leo must assemble a crew for one last, impossible job: infiltrating 'The Fortress,' a legendary, supposedly impenetrable high-tech casino owned by the megalomaniacal and paranoid former Russian intelligence officer, Anton Volkov. Leo's team is a collection of charmingly incompetent specialists: a nervous, perpetually-sweating explosives expert who only works with artisanal gunpowder; a smooth-talking, overly dramatic stage magician who insists on calling himself 'The Illusionist'; and Leo’s own skeptical daughter, a legitimate security expert who reluctantly joins to keep her father from getting himself killed. The plan involves a dizzying array of misdirection, technical sabotage, and perfectly timed, improbable coincidences, all designed around the mathematically sound but logistically chaotic principle of a 'Zero-Sum Game'—where every gain for them necessitates an equal loss for Volkov. The comedy springs from the perpetual near-failure of their highly technical plan due to the human element—the team's collective neuroses and the sheer absurdity of The Fortress's overly dramatic security measures—leading to a frantic, hilarious climax where they must improvise the final, most crucial step of the heist live on the casino floor during a high-stakes poker tournament, proving that sometimes, the only way to win is to make your own rules of the game."
  },
  {
    "title": "Star-Eater Protocol",
    "tags": ["Hard Sci-Fi", "Survival", "Cosmic Horror"],
    "synopsis": "Forty years into the first interstellar colonization mission, aboard the generation ship 'Ares VII,' a deep-space vessel carrying the last remnants of human civilization towards a distant, habitable exoplanet, the crew is abruptly awakened from cryosleep by a catastrophic system failure. They discover that their ship, designed for absolute efficiency and safety, has inexplicably gone dark and drifted thousands of light-years off course into an uncharted region of space. Chief Engineer Ava Rostova quickly realizes the failure isn't mechanical, but a result of a highly advanced, non-terrestrial signal—the 'Star-Eater Protocol'—that has corrupted the Ares VII's AI. This protocol appears to be a form of cosmic-scale trap, designed to lure sophisticated vessels into a 'stellar graveyard,' a zone where the physics of known space are warped and the stars themselves are seemingly devoured by an unseen, ancient intelligence. As the ship's systems and the crew's sanity begin to unravel under the psychological pressure of the alien entity's relentless, silent intrusion, Rostova and the remaining survivors—a mix of terrified scientists and pragmatic security personnel—must venture into the ship's heavily shielded, inaccessible core to manually reboot the AI. Their journey is a claustrophobic nightmare, navigating through pitch-black corridors where shadows move and crewmates are mysteriously vanishing. They are forced to confront the chilling realization that humanity's technological advancement has made them an attractive target, and the only hope of escape lies not in superior firepower, but in understanding and reversing the alien entity's logic, a horrifying endeavor that risks exposing their minds to a primordial, consciousness-shattering truth about the true nature of the cosmos."
  },
  {
    "title": "The Infinite Canvas",
    "tags": ["Arthouse", "Psychological Drama", "Existential"],
    "synopsis": "'The Infinite Canvas' is a deeply meditative and visually striking film that follows Arthur Penn, a once-celebrated abstract painter now living as a recluse in a minimalist studio, suffering from a severe creative block and a debilitating sense of existential dread. Arthur's life changes when he discovers a unique, unmarked tube of paint labeled 'Aether-Blue,' which, when applied to his canvas, doesn't merely create color, but seems to open a literal, albeit fleeting, portal into a different, highly personalized reality. Intrigued and desperate for inspiration, Arthur begins to use the paint sparingly, creating small windows that offer brief, tantalizing glimpses of a life he never lived, a world where his professional failures never occurred, and his lost love never left. This initial breakthrough quickly spirals into a dangerous obsession; Arthur attempts to paint increasingly larger, more complex portals, attempting to fully enter and possibly alter his parallel life. His studio becomes a chaotic kaleidoscope of half-formed realities, leading to a profound deterioration of his connection to the tangible world. The line between Arthur's art and his reality dissolves completely when the 'Aether-Blue' starts to run out, forcing him into a climactic, desperate painting session. The film culminates in a dizzying sequence where Arthur must choose which reality to make permanent—the flawed, difficult one he currently inhabits, or the impossibly perfect, but ultimately painted, one he has created—a choice that explores the profound, often painful, relationship between the artist, the artwork, and the authentic human experience."
  },
  {
    "title": "Monolith Ascendant",
    "tags": ["Action-Adventure", "Historical Fantasy", "Ancient Mystery"],
    "synopsis": "In the sweltering, politically charged climate of 1928 Cairo, the brilliant but blacklisted archaeologist Dr. Vivian Sterling is approached by a clandestine society with an offer she can't refuse: lead an expedition into the heart of the uncharted Libyan Desert to find the 'Monolith of Ra'—a mythical, pre-dynastic Egyptian structure rumored to contain not treasure, but the key to harnessing an astronomical power source linked to the very dawn of civilization. Vivian accepts, primarily to clear her family name, which was disgraced by her father's own fatal, failed search for the same artifact. Her team is a motley assortment of expendables: a rugged, morally grey mercenary hired for protection, a skeptical French linguist, and a young local guide with deep, inherited knowledge of the desert’s forgotten paths. As they navigate unforgiving sandstorms, evade rival, Nazi-backed archaeological teams, and decipher ancient, non-hieroglyphic scripts, they realize the Monolith is not merely a structure, but a colossal, inter-dimensional device left behind by an intelligence far older than humanity. When they finally reach its location—a silent, black stone edifice humming with raw energy—they inadvertently activate it, triggering a catastrophic geo-physical event that threatens to vaporize the entire region. Vivian must use a combination of her academic knowledge and the arcane principles she once dismissed as myth to rapidly 'de-activate' the Monolith, forcing her to confront a personal truth: the greatest discoveries often require a sacrifice of logic, and sometimes, the most powerful artifacts are meant to be left eternally undisturbed, a lesson learned in a desperate race against time to prevent a global catastrophe."
  }
]

function MovieTag({ tag }) {
  return <div style={{
    border: "1px solid grey",
    padding: 5,
    fontSize: 12,
    borderRadius: 7,
  }}>
    {tag}
  </div>
}

function MovieCard({ title, tags, synopsis }) {
  return <div className="movie-card" style={{
    display: "flex",
    flexDirection: "column",
    gap: 5,
    border: "1px solid grey",
    borderRadius: 10,
    padding: "10px",
    height: "250px"
  }}>
    <h2 style={{ margin: 0 }}>
      {title}
    </h2>

    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: 5
    }}>
      {tags.map((tag, index) => <MovieTag key={index} tag={tag} />)}
    </div>

    <div style={{
      overflow: "auto",
      padding: 5,
    }}>
      {synopsis}
    </div>
  </div>
}

export function App() {
  const [chromaCollection, setChromaCollection] = useState(null)

  async function queryDatabase() {
    console.log(await chromaCollection.query({ queryTexts: "a movie about space" }))
  }

  useEffect(() => {
    const initializeChroma = async () => {
      const chromaClient = new ChromaClient()
      const collection = await chromaClient.getOrCreateCollection({ name: "movies" })

      setChromaCollection(collection)
    }

    initializeChroma()
  }, [])

  return (
    <>
      <h1>Movie Recommender</h1>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <textarea type="text" />
        <button onClick={queryDatabase}>Submit</button>
      </div>

      <div className="movie-list" style={{
        marginTop: "15px",
        display: "flex",
        flexDirection: "column",
        gap: 15,
      }}>
        {mockMovies.map(((movie, index) => <MovieCard key={index} {...movie} />))}
      </div>
    </>
  )
}
