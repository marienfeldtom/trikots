<script>
    import { genders, types } from '$lib/constants';
    export let data;

    let filterGender = 'Kinder';
    let filterType = 'Alle';

    // Pagination state
    let currentPage = 1;
    const itemsPerPage = 20;
    
    // Derived filtered items
    $: filteredItems = data.items.filter(item => {
        if (filterGender !== 'Alle' && item.gender !== filterGender) return false;
        if (filterType !== 'Alle' && item.type !== filterType) return false;
        return true;
    });

    // Reset pagination when filters change
    $: if (filteredItems) currentPage = 1;

    // Derived filtered sets
    $: filteredSets = data.sets.filter(set => {
        if (filterGender !== 'Alle' && set.gender !== filterGender) return false;
        // Sets consist of 'T-Shirt weiß' and 'kurze Hose'.
        // Show sets if type filter is 'Alle' OR matches one of the set components.
        if (filterType !== 'Alle' && filterType !== 'T-Shirt weiß' && filterType !== 'kurze Hose') return false;
        return true;
    });

    $: totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    $: paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    function changePage(page) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }
</script>

<style>
    .header {
        background: white; /* Changed to white for logo */
        color: #068300;
        padding: 1rem;
        text-align: center;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        border-bottom: 4px solid #068300;
    }
    
    .logo {
        max-height: 80px;
        margin-bottom: 0.5rem;
    }

    .header h1 {
        margin: 0;
        font-size: 1.5rem;
        color: #068300;
        text-transform: uppercase;
        letter-spacing: 1px;
    }

    .container {
        padding: 1rem;
        max-width: 800px;
        margin: 0 auto;
        padding-bottom: 4rem;
    }

    .section-title {
        font-size: 1.25rem;
        color: #068300;
        margin: 2rem 0 1rem;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 0.5rem;
        font-weight: 700;
    }

    /* Sets Grid */
    .sets-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 1rem;
    }

    .set-card {
        background: white;
        border: 2px solid #068300; /* Brand green */
        border-radius: 10px;
        padding: 1rem;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .set-number {
        font-size: 2rem;
        font-weight: 800;
        color: #068300;
        line-height: 1;
        margin-bottom: 0.25rem;
    }
    
    .set-details {
        font-size: 0.9rem;
        color: #64748b;
        font-weight: 500;
    }

    .badge {
        display: inline-block;
        background: #068300;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 99px;
        font-size: 0.75rem;
        font-weight: bold;
        margin-top: 0.5rem;
    }

    /* Inventory Filters */
    .filters {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
        overflow-x: auto;
        padding-bottom: 0.5rem;
    }

    select {
        padding: 0.5rem 1rem;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        background: white;
        font-size: 0.95rem;
        color: #0f172a;
    }

    /* Inventory List */
    .inventory-list {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .item-row {
        background: white;
        padding: 1rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        border-left: 4px solid #e2e8f0;
    }

    .item-row.condition-Wie-neu { border-left-color: #22c55e; }
    .item-row.condition-Wenig-Backe { border-left-color: #eab308; }
    .item-row.condition-Viel-Backe { border-left-color: #ef4444; }

    .item-number {
        font-size: 1.25rem;
        font-weight: bold;
        color: #068300;
        width: 40px;
        text-align: center;
        background: #f0fdf4; /* Light green bg */
        padding: 0.25rem;
        border-radius: 6px;
    }

    .item-info {
        flex: 1;
    }

    /* Filter Tabs */
    .tabs {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin-bottom: 2rem;
        background: #f1f5f9;
        padding: 0.5rem;
        border-radius: 12px;
    }

    .tab-btn {
        flex: 1;
        padding: 0.75rem 1.5rem;
        border: none;
        background: transparent;
        color: #64748b;
        font-weight: 600;
        cursor: pointer;
        border-radius: 8px;
        transition: all 0.2s;
        max-width: 150px;
    }

    .tab-btn.active {
        background: white;
        color: #068300;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .item-type {
        font-weight: 600;
        display: block;
    }

    .item-meta {
        font-size: 0.85rem;
        color: #64748b;
        display: block;
    }
    
    .item-condition {
        font-size: 0.75rem;
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
        color: #475569;
        margin-top: 2px;
        display: inline-block;
    }

    footer {
        text-align: center;
        margin-top: 3rem;
        font-size: 0.9rem;
    }
    
    a {
        color: #64748b;
        text-decoration: none;
    }

    .set-conditions {
        margin-top: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        font-size: 0.75rem;
    }
    
    .set-cond-row {
        display: flex;
        justify-content: space-between;
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
        color: #475569;
    }

    .pagination {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-top: 2rem;
    }

    .page-btn {
        background: white;
        border: 1px solid #cbd5e1;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        color: #0f172a;
    }

    .page-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .page-info {
        font-size: 0.9rem;
        color: #64748b;
    }
</style>

<div class="header">
    <img src="https://www.tura-meldorf.de/wp-content/uploads/2022/03/logo-stadtmarke-transparent-1536x415.png" alt="TuRa Meldorf Logo" class="logo">
    <h1>Handball Trikots</h1>
</div>

<div class="container">
    <div class="tabs">
        {#each genders as g}
            <button 
                class="tab-btn {filterGender === g ? 'active' : ''}"
                on:click={() => filterGender = g}
            >
                {g}
            </button>
        {/each}
    </div>

    {#if filteredSets.length > 0}
        <h2 class="section-title">✨ Vollständige Sets</h2>
        <div class="sets-grid">
            {#each filteredSets as set}
                <div class="set-card">
                    <div class="set-number">{set.number}</div>
                    <div class="set-details">{set.size}</div>
                    <div class="badge">{set.gender}</div>
                    <div class="set-conditions">
                        <div class="set-cond-row">
                            <span>👕</span> <span>{set.shirt_condition}</span>
                        </div>
                        <div class="set-cond-row">
                            <span>🩳</span> <span>{set.shorts_condition}</span>
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}

    <h2 class="section-title">Inventar Übersicht</h2>
    

    
    <div class="filters">
        <!-- Gender filter moved to tabs -->
        
        <select bind:value={filterType}>
            <option value="Alle">Alle Typen</option>
            {#each types as t}<option value={t}>{t}</option>{/each}
        </select>
    </div>

    <div class="inventory-list">
        {#each paginatedItems as item}
            <div class="item-row condition-{item.condition.replace(/\s+/g, '-')}">
                <div class="item-number">{item.number ?? '-'}</div>
                <div class="item-info">
                    <span class="item-type">{item.type}</span>
                    <span class="item-meta">{item.size} • {item.gender}</span>
                    <span class="item-condition">{item.condition}</span>
                </div>
            </div>
        {/each}
        {#if filteredItems.length === 0}
            <p style="text-align: center; color: #94a3b8; padding: 2rem;">Keine Trikots gefunden.</p>
        {/if}
    </div>

    <!-- Pagination -->
    {#if totalPages > 1}
        <div class="pagination">
            <button class="page-btn" disabled={currentPage === 1} on:click={() => changePage(currentPage - 1)}>
                &larr; Zurück
            </button>
            <span class="page-info">Seite {currentPage} von {totalPages}</span>
            <button class="page-btn" disabled={currentPage === totalPages} on:click={() => changePage(currentPage + 1)}>
                Weiter &rarr;
            </button>
        </div>
    {/if}

    <footer>
        <a href="/admin">Admin Login</a>
    </footer>
</div>
