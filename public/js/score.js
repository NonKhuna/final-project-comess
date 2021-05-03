$(async function () {
    const users = await Get(`/room/${getRoomId()}/scoreboard`);
    for(var i in users) {
        $('#main-table-body').append(
            `<tr>
                <th>${1 + Number(i)}) ${users[i].name}</th>
                <th>${users[i].score}</th>
            </tr>`
        )
    }
  });