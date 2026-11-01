import { useState } from 'react'
import {
  Bell, Compass, House, ImagePlus, MessageCircle, Search, Settings2,
  UserRound, Plus, ArrowUpRight, ChevronDown, Menu, X
} from 'lucide-react'

type Page = 'Home' | 'Discover' | 'Create' | 'Messages' | 'Profile' | 'Settings'
type FeedView = 'Visual' | 'Posts'

const nav: { label: Page; icon: typeof House }[] = [
  { label: 'Home', icon: House },
  { label: 'Discover', icon: Compass },
  { label: 'Create', icon: Plus },
  { label: 'Messages', icon: MessageCircle },
  { label: 'Profile', icon: UserRound },
]

function Brand() {
  return <div className="brand" aria-label="VYBE home"><span className="brand-mark">V</span><span>vybe</span></div>
}

function EmptyState({ title, detail, action, onAction }: {
  title: string; detail: string; action?: string; onAction?: () => void
}) {
  return <div className="empty-state">
    <div className="empty-mark" aria-hidden="true"><span>V</span></div>
    <h2>{title}</h2>
    <p>{detail}</p>
    {action && onAction && <button className="button primary" onClick={onAction}>{action}</button>}
  </div>
}

export default function App() {
  const [page, setPage] = useState<Page>('Home')
  const [feedView, setFeedView] = useState<FeedView>('Visual')
  const [mobileMenu, setMobileMenu] = useState(false)
  const [caption, setCaption] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const go = (next: Page) => {
    setPage(next)
    setMobileMenu(false)
  }

  const pageTitle: Record<Page, string> = {
    Home: 'Home', Discover: 'Discover', Create: 'Create', Messages: 'Messages',
    Profile: 'Profile', Settings: 'Settings'
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <Brand />
      <nav className="side-nav" aria-label="Main navigation">
        {nav.map(({ label, icon: Icon }) => <button key={label}
          className={`nav-item ${page === label ? 'active' : ''}`}
          onClick={() => go(label)}>
          <Icon size={20} strokeWidth={1.8} /><span>{label}</span>
        </button>)}
      </nav>
      <div className="sidebar-bottom">
        <button className={`nav-item ${page === 'Settings' ? 'active' : ''}`} onClick={() => go('Settings')}>
          <Settings2 size={20} strokeWidth={1.8} /><span>Settings</span>
        </button>
        <div className="sidebar-note"><span className="status-dot" />New space. Real people.</div>
      </div>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="mobile-menu icon-button" aria-label="Open navigation" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className="mobile-brand"><Brand /></div>
        <h1>{pageTitle[page]}</h1>
        <div className="top-actions">
          <button className="icon-button search-button" aria-label="Search" onClick={() => go('Discover')}><Search size={19} /></button>
          <button className="icon-button" aria-label="Notifications" title="Notifications"><Bell size={19} /></button>
          <button className="avatar-placeholder" aria-label="Open profile" onClick={() => go('Profile')}><UserRound size={17} /></button>
        </div>
      </header>

      {mobileMenu && <div className="mobile-nav">
        {nav.map(({ label, icon: Icon }) => <button key={label} className="nav-item" onClick={() => go(label)}><Icon size={20}/><span>{label}</span></button>)}
        <button className="nav-item" onClick={() => go('Settings')}><Settings2 size={20}/><span>Settings</span></button>
      </div>}

      {page === 'Home' && <section className="page-content">
        <div className="feed-toolbar">
          <div className="segmented" role="tablist" aria-label="Feed view">
            {(['Visual', 'Posts'] as FeedView[]).map(view => <button key={view}
              role="tab" aria-selected={feedView === view}
              className={feedView === view ? 'selected' : ''}
              onClick={() => setFeedView(view)}>{view}</button>)}
          </div>
          <button className="icon-button filter-button" aria-label="Feed options"><ChevronDown size={18}/></button>
        </div>
        <EmptyState
          title={feedView === 'Visual' ? 'Your visual feed starts here' : 'Your feed starts here'}
          detail={feedView === 'Visual'
            ? 'Discover photos and ideas from people you connect with.'
            : 'Posts from people you connect with will show up here.'}
          action="Find people"
          onAction={() => go('Discover')}
        />
      </section>}

      {page === 'Discover' && <section className="page-content">
        <div className="discover-heading">
          <div><p className="eyebrow">DISCOVER</p><h2>Find your people.</h2></div>
          <button className="icon-button" aria-label="Search people"><Search size={19}/></button>
        </div>
        <div className="search-field"><Search size={18}/><input aria-label="Search people and interests" placeholder="People, interests, communities" /></div>
        <div className="discovery-filters"><button className="chip active">For you</button><button className="chip">People</button><button className="chip">Interests</button><button className="chip">Compatible</button></div>
        <EmptyState title="It's quiet here—for now" detail="When people join VYBE, you'll find them here. No made-up profiles, just real people." />
      </section>}

      {page === 'Create' && <section className="page-content narrow">
        <div className="section-heading"><div><p className="eyebrow">CREATE</p><h2>Share something.</h2></div></div>
        <label className="upload-box">
          <ImagePlus size={25}/><span>{selectedFile ? selectedFile.name : 'Choose a photo or video'}</span>
          <small>Media preview is local until uploads are connected.</small>
          <input type="file" accept="image/*,video/*" onChange={e => setSelectedFile(e.target.files?.[0] ?? null)} />
        </label>
        <label className="field-label" htmlFor="caption">Caption</label>
        <textarea id="caption" value={caption} onChange={e => setCaption(e.target.value)} placeholder="Say something…" rows={4}/>
        <button className="button primary full" disabled={!selectedFile || !caption.trim()} title="Publishing will be enabled when Supabase is connected">Publish</button>
        <p className="form-note">Publishing will be enabled when the real account and storage services are connected.</p>
      </section>}

      {page === 'Messages' && <section className="page-content">
        <div className="messages-tabs"><button className="active">Inbox</button><button>Requests <span className="tiny-count">0</span></button></div>
        <EmptyState title="Your conversations will live here" detail="Message requests let you choose who can reach your inbox." action="Discover people" onAction={() => go('Discover')} />
      </section>}

      {page === 'Profile' && <section className="page-content">
        <div className="profile-top"><div className="profile-avatar"><UserRound size={30}/></div><div><h2>Your profile</h2><p className="muted">Set up your space on VYBE.</p></div></div>
        <div className="profile-tabs"><button className="active">Posts</button><button>About</button><button>Saved</button></div>
        <EmptyState title="Your story starts here" detail="Your posts and interests will appear on your profile." action="Create a post" onAction={() => go('Create')} />
      </section>}

      {page === 'Settings' && <section className="page-content narrow">
        <div className="section-heading"><div><p className="eyebrow">YOUR SPACE</p><h2>Settings</h2></div></div>
        <div className="settings-list">
          <button><span>Account</span><ArrowUpRight size={17}/></button>
          <button><span>Privacy and safety</span><ArrowUpRight size={17}/></button>
          <button><span>Notifications</span><ArrowUpRight size={17}/></button>
          <button><span>Appearance</span><ArrowUpRight size={17}/></button>
        </div>
      </section>}
    </main>

    <nav className="mobile-bottom" aria-label="Mobile navigation">
      {nav.map(({ label, icon: Icon }) => <button key={label} className={page === label ? 'active' : ''} onClick={() => go(label)} aria-label={label}>
        <Icon size={21} strokeWidth={page === label ? 2.3 : 1.8}/><span>{label}</span>
      </button>)}
    </nav>
  </div>
}
